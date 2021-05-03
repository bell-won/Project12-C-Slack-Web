import { useCallback, useEffect } from 'react'
import {
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil'
import { getChannelList } from './api/channel'
import { getWorkspaceUserInfo } from './api/workspace'
import { SOCKET_EVENT } from './constant'
import io from 'socket.io-client'
import { isEmpty } from './util'

const baseURL =
  process.env.NODE_ENV === 'development'
    ? process.env.REACT_APP_DEV_CHAT_HOST
    : process.env.REACT_APP_CHAT_HOST

export const workspaceRecoil = atom({
  key: 'workspace',
  default: null,
})

export const currentChannelInfoRecoil = atom({
  key: 'currentChannel',
  default: '',
})

export const channelsRecoil = atom({
  key: 'channels',
  default: [],
})

export const modalRecoil = atom({
  key: 'modal',
  default: null,
})

export const socketRecoil = atom({
  key: 'socket',
  default: null,
  dangerouslyAllowMutability: true,
})

export const useInitializeAtoms = workspaceId => {
  const setWorkspaceInfo = useSetRecoilState(workspaceRecoil)
  const [channels, setChannels] = useRecoilState(channelsRecoil)
  const [socket, setSocket] = useRecoilState(socketRecoil)
  useEffect(
    function didMount() {
      const initializeAtoms = async () => {
        const workspaceUserInfo = await getWorkspaceUserInfo({ workspaceId })
        const workspaceUserInfoId = workspaceUserInfo._id
        const channels = await getChannelList({ workspaceUserInfoId })
        const socket = io(`${baseURL}/${workspaceId}`, {
          query: {
            workspaceId,
            workspaceUserInfoId,
          },
        })
        setWorkspaceInfo(workspaceUserInfo)
        setChannels(channels)
        setSocket(socket)
        return function cleanUp() {
          socket.disconnect()
        }
      }
      return initializeAtoms()
    },
    [workspaceId, setChannels, setSocket, setWorkspaceInfo],
  )
  useEffect(
    function excuteWhenChannelsChanged() {
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
    },
    [socket, channels],
  )
}

const DM_TYPE = 2
const DM_SECTION_NAME = 'Direct messages'
const DEFAULT_SECTION_NAME = 'Channels'

export const sectionRecoil = selector({
  key: 'sections',
  get: ({ get }) =>
    Object.entries(
      get(channelsRecoil).reduce(classifySections, {
        [DM_SECTION_NAME]: [],
        [DEFAULT_SECTION_NAME]: [],
      }),
    ).reverse(),
})

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

export const useSetChannels = () => {
  const workspaceUserInfo = useRecoilValue(workspaceRecoil)
  const workspaceUserInfoId = workspaceUserInfo?._id
  const setter = useSetRecoilState(channelsRecoil)
  const setChannels = useCallback(async () => {
    setter(await getChannelList({ workspaceUserInfoId }))
  }, [workspaceUserInfoId, setter])
  return setChannels
}

export const useChannels = () => {
  const channels = useRecoilValue(channelsRecoil)
  const setChannels = useSetChannels()
  return [channels, setChannels]
}
