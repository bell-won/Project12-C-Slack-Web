import { useEffect } from 'react'
import {
  atom,
  atomFamily,
  selectorFamily,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil'
import { getChannelList, getChannelHeaderInfo } from './api/channel'
import { getWorkspaceUserInfo } from './api/workspace'
import { SOCKET_EVENT } from './constant'
import io from 'socket.io-client'
import { isEmpty } from './util'

const baseURL =
  process.env.NODE_ENV === 'development'
    ? process.env.REACT_APP_DEV_CHAT_HOST
    : process.env.REACT_APP_CHAT_HOST

export const modalRecoil = atom({
  key: 'modal',
  default: null,
})

export const socketRecoil = atom({
  key: 'socket',
  default: null,
  dangerouslyAllowMutability: true,
})

export const channelInfoQueryRequestID = atomFamily({
  key: 'channelInfoQueryRequestID',
  default: 0,
})

export const channelInfoQuery = selectorFamily({
  key: 'channelInfoQuery',
  get: ({ workspaceId, channelId }) => async ({ get }) => {
    const { _id: workspaceUserInfoId } = get(workspaceQuery(workspaceId))
    get(channelInfoQueryRequestID({ workspaceUserInfoId, channelId }))
    return await getChannelHeaderInfo({ workspaceUserInfoId, channelId })
  },
})

export const useRefreshChannelInfo = ({ workspaceId, channelId }) => {
  const { _id: workspaceUserInfoId } = useRecoilValue(
    workspaceQuery(workspaceId),
  )
  const setChannelInfoQueryRequestID = useSetRecoilState(
    channelInfoQueryRequestID({ workspaceUserInfoId, channelId }),
  )
  return () => {
    setChannelInfoQueryRequestID(requestID => requestID + 1)
  }
}

export const workspaceQuery = selectorFamily({
  key: 'workspaceUserInfoQuery',
  get: workspaceId => async () => getWorkspaceUserInfo({ workspaceId }),
})

export const channelsQueryRequestID = atomFamily({
  key: 'channelsQueryRequestID',
  default: 0,
})

export const channelsQuery = selectorFamily({
  key: 'channelsQuery',
  get: workspaceId => async ({ get }) => {
    const { _id: workspaceUserInfoId } = get(workspaceQuery(workspaceId))
    get(channelsQueryRequestID(workspaceUserInfoId))
    return Object.values(await getChannelList({ workspaceUserInfoId }))
  },
})

export const useRefreshChannels = workspaceId => {
  const { _id: workspaceUserInfoId } = useRecoilValue(
    workspaceQuery(workspaceId),
  )
  const setChannelsQueryRequestID = useSetRecoilState(
    channelsQueryRequestID(workspaceUserInfoId),
  )
  return () => {
    setChannelsQueryRequestID(requestID => requestID + 1)
  }
}

export const sectionsFromChannels = selectorFamily({
  key: 'sections',
  get: workspaceId => ({ get }) => {
    const channels = get(channelsQuery(workspaceId))
    return Object.entries(
      channels.reduce(classifySections, {
        [DM_SECTION_NAME]: [],
        [DEFAULT_SECTION_NAME]: [],
      }),
    ).reverse()
  },
})

export const useInitSocket = workspaceId => {
  const [socket, setSocket] = useRecoilState(socketRecoil)
  const { _id: workspaceUserInfoId } = useRecoilValue(
    workspaceQuery(workspaceId),
  )
  const channels = useRecoilValue(channelsQuery(workspaceId))
  useEffect(() => {
    const socket = io(`${baseURL}/${workspaceId}`, {
      query: {
        workspaceId,
        workspaceUserInfoId,
      },
    })
    setSocket(socket)
    return function cleanUp() {
      socket.disconnect()
    }
  }, [workspaceId, workspaceUserInfoId, setSocket])
  useEffect(() => {
    if (socket && !isEmpty(channels)) {
      socket.emit(
        SOCKET_EVENT.JOIN_ROOM,
        channels.map(channel => channel.channelId._id),
      )
    }
    return function cleanUp() {
      if (socket)
        socket.emit(
          SOCKET_EVENT.LEAVE_ROOM,
          channels.map(channel => channel.channelId._id),
        )
    }
  }, [workspaceId, channels, workspaceUserInfoId, setSocket, socket])
}

const DM_TYPE = 2
const DM_SECTION_NAME = 'Direct messages'
const DEFAULT_SECTION_NAME = 'Channels'

const classifySections = (prev, channel) => {
  if (channel.sectionName) {
    prev[channel.sectionName]
      ? prev[channel.sectionName].push(channel)
      : (prev[channel.sectionName] = [channel])
  } else {
    channel.channelId.channelType === DM_TYPE
      ? prev[DM_SECTION_NAME].push(channel)
      : prev[DEFAULT_SECTION_NAME].push(channel)
  }
  return prev
}
