import { useCallback, useEffect } from 'react'
import { atom, selector, useRecoilValue, useSetRecoilState } from 'recoil'
import { getChannelList } from './api/channel'
import { getWorkspaceUserInfo } from './api/workspace'
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
  const setChannelList = useSetRecoilState(channelsRecoil)
  useEffect(
    function didMount() {
      const initializeAtoms = async () => {
        const workspaceInfo = await getWorkspaceUserInfo({ workspaceId })
        const workspaceUserInfoId = workspaceInfo._id
        setWorkspaceInfo(workspaceInfo)
        setChannelList(await getChannelList({ workspaceUserInfoId }))
      }
      initializeAtoms()
    },
    [setChannelList, setWorkspaceInfo, workspaceId],
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
  const setChannelList = useCallback(async () => {
    setter(await getChannelList({ workspaceUserInfoId }))
  }, [workspaceUserInfoId, setter])
  return setChannelList
}

export const useChannels = () => {
  const channels = useRecoilValue(channelsRecoil)
  const setChannels = useSetChannels()
  return [channels, setChannels]
}
