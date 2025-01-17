import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  Suspense,
} from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import { useRecoilValue } from 'recoil'

import { getChatMessage } from '../../../api/chat'
import { COLOR } from '../../../shared/constant/style'
import { ArrowDown } from '../../../shared/constant/icon'
import { SOCKET_EVENT } from '../../../shared/constant'
import { isEmpty } from '../../../shared/utils'
import {
  hasMyReaction,
  chageReactionState,
} from '../../../reaction/utils/reactionUpdate'
import {
  workspaceQuery,
  socketRecoil,
  channelInfoQuery,
  useRefreshChannelInfo,
  useRefreshChannels,
  useInitSocket,
} from '../../../store'

import ChatMessage from '../ChatMessage'
import MessageEditor from '../MessageEditor'
import ChannelHeader from '../../../channel/components/ChannelHeader'
import Icon from '../../../shared/components/Icon'

const ChatRoom = ({ width }) => {
  const viewport = useRef(null)
  const observerTargetNode = useRef(null)
  const messageEndRef = useRef(null)
  const previousReadMessage = useRef(null)
  const isLoading = useRef(false)
  const isAllMessageFetched = useRef(false)
  const isReading = useRef(false)
  const { workspaceId, channelId } = useParams()
  const workspaceUserInfo = useRecoilValue(workspaceQuery(workspaceId))
  const refreshChannels = useRefreshChannels(workspaceId)
  const channelInfo = useRecoilValue(
    channelInfoQuery({ workspaceId, channelId }),
  )
  const refreshChannelInfo = useRefreshChannelInfo({ workspaceId, channelId })
  const socket = useRecoilValue(socketRecoil)
  const [messages, setMessages] = useState([])
  const [previousReadMessageIndex, setPreviousReadMessageIndex] = useState(0)
  const [hasUnreadMessage, setHasUnreadMessage] = useState(false)
  useInitSocket(workspaceId)

  const loadMessage = useCallback(
    async (workspaceId, channelId, currentCursor) => {
      isLoading.current = true
      const newMessages = await getChatMessage({
        workspaceId,
        channelId,
        currentCursor,
      })
      if (!newMessages.length) isAllMessageFetched.current = true
      if (!isEmpty(messages)) setPreviousReadMessageIndex(newMessages.length)
      setMessages(messages => [
        ...hasMyReaction(newMessages, workspaceUserInfo),
        ...messages,
      ])
      if (previousReadMessage.current) scrollTo(previousReadMessage.current)
      if (!previousReadMessage.current && newMessages.length !== 0) scrollTo()
      isLoading.current = false
    },
    [messages],
  )

  useEffect(() => {
    setMessages([])
    isLoading.current = false
    isAllMessageFetched.current = false
    loadMessage(workspaceId, channelId, new Date())
  }, [workspaceId, channelId])

  const scrollTo = (target = messageEndRef.current) => {
    target.scrollIntoView()
  }

  const sendMessage = (message, file) => {
    const chat = {
      contents: message,
      channelId,
      file: file,
      userInfo: {
        _id: workspaceUserInfo._id,
        displayName: workspaceUserInfo.displayName,
        profileUrl: workspaceUserInfo.profileUrl,
      },
    }
    socket.emit(SOCKET_EVENT.NEW_MESSAGE, chat)
  }

  useEffect(() => {
    setMessages(messages => [...hasMyReaction(messages, workspaceUserInfo)])
  }, [workspaceUserInfo])

  useEffect(() => {
    if (socket) {
      const workspaceUserInfoId = workspaceUserInfo._id
      socket.on(SOCKET_EVENT.NEW_MESSAGE, ({ message }) => {
        if (message.channelId === channelId) {
          setMessages(messages => [
            ...messages,
            ...hasMyReaction([message], workspaceUserInfo),
          ])
          if (message.userInfo._id === workspaceUserInfoId) {
            setHasUnreadMessage(false)
            scrollTo()
          } else if (!isReading.current && !document.hasFocus()) {
            setHasUnreadMessage(true)
          }
        }

        if (document.hidden) {
          new Notification('새로운 메시지가 왔습니다.', {
            body: `${message.userInfo.displayName} : ${message.contents}`,
          })
        }

        if (message.userInfo._id === workspaceUserInfoId) scrollTo()
      })
      socket.on(SOCKET_EVENT.NEW_REPLY, ({ message }) => {
        setMessages(messages =>
          messages.map(target =>
            target._id === message.parentId
              ? { ...target, reply: [...target.reply, message] }
              : target,
          ),
        )
      })
      socket.on(SOCKET_EVENT.UPDAETE_REACTION, ({ reaction }) => {
        setMessages(messages =>
          chageReactionState(messages, reaction, workspaceUserInfo),
        )
      })
      socket.on(
        SOCKET_EVENT.INVITED_CHANNEL,
        ({ channelId: invitedChannelId, newMember }) => {
          if (channelId === invitedChannelId) refreshChannelInfo()
          if (newMember.includes(workspaceUserInfoId)) refreshChannels()
        },
      )
    }
    return () => {
      if (socket) {
        socket.off(SOCKET_EVENT.NEW_REPLY)
        socket.off(SOCKET_EVENT.NEW_MESSAGE)
        socket.off(SOCKET_EVENT.UPDAETE_REACTION)
        socket.off(SOCKET_EVENT.INVITED_CHANNEL)
      }
    }
  }, [
    socket,
    channelId,
    workspaceUserInfo,
    refreshChannelInfo,
    refreshChannels,
  ])

  useEffect(() => {
    const handleIntersection = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.target === messageEndRef.current) {
          if (!entry.isIntersecting || !document.hasFocus()) {
            isReading.current = false
          }
          if (entry.isIntersecting) {
            setHasUnreadMessage(false)
            isReading.current = true
          }
        }
        if (entry.target === observerTargetNode.current) {
          if (
            entry.isIntersecting &&
            !isLoading.current &&
            !isAllMessageFetched.current
          ) {
            loadMessage(workspaceId, channelId, observerTargetNode.current.id)
            observer.unobserve(entry.target)
            observer.observe(observerTargetNode.current)
          }
        }
      })
    }
    const IO = new IntersectionObserver(handleIntersection, {
      root: viewport.current,
      threshold: 0,
    })
    if (observerTargetNode.current) IO.observe(observerTargetNode.current)
    if (messageEndRef.current) IO.observe(messageEndRef.current)
    return () => IO && IO.disconnect()
  }, [channelId, workspaceId, loadMessage])

  const setRef = useCallback(
    index => {
      if (index === 0) return node => (observerTargetNode.current = node)
      if (index === previousReadMessageIndex)
        return node => (previousReadMessage.current = node)
    },
    [previousReadMessageIndex],
  )
  const handleUnreadMessageButton = () => {
    scrollTo()
  }
  return (
    <ChatArea width={width}>
      <ChatHeader>
        <ChannelHeader />
      </ChatHeader>
      <ChatContents ref={viewport}>
        {messages &&
          messages.map((message, i) => {
            return (
              <ChatMessage
                key={i}
                {...message}
                ref={setRef(i)}
                id={message.createdAt}
              />
            )
          })}
        {hasUnreadMessage && (
          <UnreadMessage onClick={handleUnreadMessageButton}>
            <Icon icon={ArrowDown} customStyle={customIconStyle} /> Unread
            messages..
          </UnreadMessage>
        )}
        <MessageEnd ref={messageEndRef} />
      </ChatContents>
      <MessageEditor
        sendMessage={sendMessage}
        placeholder={`Send a message to #${
          channelInfo?.channelId?.title ? channelInfo?.channelId?.title : '...'
        }`}
      />
    </ChatArea>
  )
}

const customIconStyle = {
  color: COLOR.WHITE,
}

const ChatArea = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: ${props => `calc( 100% - ${props.width}px)`};
  background: ${COLOR.HOVER_GRAY};
`

const ChatHeader = styled.div`
  display: flex;
  width: 100%;
  height: 60px;
  background: ${COLOR.BACKGROUND_CONTENTS};
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-sizing: border-box;
`

const ChatContents = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100% - 100px);
  overflow-x: hidden;
  overflow-y: auto;
  background: ${COLOR.WHITE};
  border: 1px solid rgba(255, 255, 255, 0.1);
`
const UnreadMessage = styled.div`
  border-radius: 30px;
  border: 1px solid ${COLOR.LIGHT_GRAY};
  background-color: ${COLOR.STARBLUE};
  color: ${COLOR.WHITE};
  width: 170px;
  margin-left: auto;
  margin-right: auto;
  position: sticky;
  bottom: 15px;
  text-align: center;
  padding: 5px;
  font-weight: 700;
  cursor: pointer;
`
const MessageEnd = styled.div`
  min-height: 1px;
`
const Content = ({ width }) => {
  return (
    <Suspense fallback={<ChatArea width={width} />}>
      <ChatRoom width={width} />
    </Suspense>
  )
}

export default Content
