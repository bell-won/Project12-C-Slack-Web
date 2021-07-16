import React, { useState, forwardRef } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { useRecoilValue } from 'recoil'
import Image from '../../atom/Image'
import ChatContent from '../../molecule/ChatContent'
import ReactionButton from '../../molecule/ReactionButton'
import ReactionModalButton from '../../molecule/ReactionModalButton'
import ActionBar from '../ActionBar'
import ViewThreadButton from '../../molecule/ViewThreadButton'
import { isEmpty } from '../../../util'
import { SIZE, COLOR } from '../../../constant/style'
import { workspaceQuery, socketRecoil } from '../../../store'
import FilePreview from '../../molecule/FilePreview'
import { SOCKET_EVENT } from '../../../constant'
const ChatMessage = forwardRef(
  (
    {
      userInfo,
      reply,
      reactions,
      _id,
      createdAt,
      parentId,
      contents,
      type = 'chat',
      file,
    },
    ref,
  ) => {
    const { workspaceId, channelId } = useParams()
    const [openModal, setOpenModal] = useState(false)
    const [hover, setHover] = useState(false)
    const workspaceUserInfo = useRecoilValue(workspaceQuery(workspaceId))
    const socket = useRecoilValue(socketRecoil)

    const updateReaction = ({ emoji, chatId, channelId, type }) => {
      const reaction = {
        emoji,
        chatId,
        channelId,
        parentId,
        type,
        userInfo: {
          _id: workspaceUserInfo._id,
          displayName: workspaceUserInfo.displayName,
        },
      }
      socket.emit(SOCKET_EVENT.UPDAETE_REACTION, reaction)
    }

    const updateReactionHandler = emoji => {
      let done = false
      reactions.forEach(reaction => {
        if (reaction.emoji === emoji) {
          if (reaction.set) {
            updateReaction({
              emoji: emoji.native || emoji,
              chatId: _id,
              channelId,
              type: 0,
            })
            done = true
          }
        }
      })
      if (!done) {
        updateReaction({
          emoji: emoji.native || emoji,
          chatId: _id,
          channelId,
          type: 1,
        })
      }
    }

    const handleHoverEvent = ({ type: eventType }) =>
      setHover(eventType === 'mouseenter' ? true : false)

    return (
      <MessageContents
        type={type}
        ref={ref}
        id={createdAt}
        onMouseEnter={handleHoverEvent}
        onMouseLeave={handleHoverEvent}
      >
        <Image src={userInfo.profileUrl} customStyle={profileImageStyle} />
        <ChatContent
          displayName={userInfo.displayName}
          createdAt={createdAt}
          contents={contents}
          fileContents={
            !isEmpty(file) && <FilePreview type="message" file={file} />
          }
        />
        {!isEmpty(reactions) && (
          <ThreadReactionStyle>
            {reactions.map(reaction => (
              <ReactionButton
                key={reaction.emoji}
                reaction={reaction}
                chatId={_id}
                updateReactionHandler={updateReactionHandler}
              />
            ))}
            <ReactionModalButton
              chatId={_id}
              updateReactionHandler={updateReactionHandler}
            />
          </ThreadReactionStyle>
        )}
        {type !== 'reply' && !isEmpty(reply) && (
          <StyleLink to={`/workspace/${workspaceId}/${channelId}/${_id}`}>
            <ViewThreadButton reply={reply} />
          </StyleLink>
        )}
        {(hover || openModal) && (
          <ActionBarStyle type={type}>
            <ActionBar
              setOpenModal={setOpenModal}
              chatId={_id}
              updateReactionHandler={updateReactionHandler}
              type={type}
            />
          </ActionBarStyle>
        )}
      </MessageContents>
    )
  },
)
const profileImageStyle = {
  width: `${SIZE.CHAT_PROFILE}px`,
  height: `${SIZE.CHAT_PROFILE}px`,
  borderRadius: '3px',
}
const ActionBarStyle = styled.div`
  position: absolute;
  ${({ type }) => {
    if (type === 'reply') return 'width: 100px;'
    return 'width: 300px;'
  }}
  height: 30px;
  right: 10px;
  border-radius: 5px;
  display: flex;
`
const MessageContents = styled.div`
  position: relative;
  display: grid;
  row-gap: 5px;
  column-gap: 10px;
  grid-template-columns: ${SIZE.CHAT_PROFILE}px auto;
  margin: 5px 0;
  &:hover {
    background-color: ${COLOR.HOVER_GRAY};
  }
  padding: 8px 20px;
`

const ThreadReactionStyle = styled.div`
  width: auto;
  min-height: 30px;
  grid-column-start: 2;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  border-radius: 5px;
  gap: 5px;
  flex-flow: wrap;
`

const StyleLink = styled(NavLink)`
  text-decoration: none;
  grid-column-start: 2;
  color: ${COLOR.STARBLUE};
  background-color: ${COLOR.WHITE};
  border: 1px solid transparent;
  border-radius: 5px;
  padding: 5px;
  margin: 0 0 0 -5px;
  &:hover {
    border: 1px solid ${COLOR.LIGHT_GRAY};
    border-radius: 5px;
  }
`
export default ChatMessage
