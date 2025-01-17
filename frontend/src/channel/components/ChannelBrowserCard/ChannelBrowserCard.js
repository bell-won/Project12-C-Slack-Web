import React from 'react'
import styled from 'styled-components'
import { useRecoilValue } from 'recoil'
import { useHistory, useParams } from 'react-router'
import { leaveChannel, joinChannel } from '../../../api/channel'
import { useRefreshChannels, workspaceQuery } from '../../../store'
import { COLOR } from '../../../shared/constant/style'
import Description from '../../../shared/components/Description'
import Button from '../../../shared/components/Button'

function ChannelBrowserCard({
  _id,
  title,
  joined,
  channelType,
  handleClose,
  workspaceUserInfoId,
}) {
  const { workspaceId, channelId } = useParams()
  const workspaceUserInfo = useRecoilValue(workspaceQuery(workspaceId))
  const refreshChannels = useRefreshChannels(workspaceId)
  const history = useHistory()
  const defaultChannel = workspaceUserInfo.workspaceInfo.default_channel

  const clickEvent = async () => {
    if (joined) {
      await leaveChannel({
        workspaceUserInfoId,
        channelId: _id,
      })
      if (channelId === _id) {
        history.push(`/workspace/${workspaceId}/${defaultChannel}`)
      }
    } else {
      await joinChannel({
        workspaceUserInfoId,
        channelId: _id,
      })
    }
    refreshChannels()
    handleClose()
  }
  const createButton = () => {
    if (channelType === 0) return 'private'
    if (_id === defaultChannel) return 'Default channel'
    if (joined) return 'Leave'
    return 'Join'
  }
  return (
    <ChannelBrowserCardStyle>
      <Description customStyle={customDescriptionStyle}>{title}</Description>
      <Button
        customStyle={customButtonStyle}
        onClick={clickEvent}
        disabled={_id === defaultChannel || (channelType === 0 && !joined)}
      >
        {createButton()}
      </Button>
    </ChannelBrowserCardStyle>
  )
}
const customButtonStyle = {
  backgroundColor: COLOR.RUBY,
  hoverBackgroundColor: COLOR.HOVER_RUBY,
}
const customDescriptionStyle = {
  fontSize: '20px',
}
const ChannelBrowserCardStyle = styled.div`
  width: auto;
  height: 50px;
  border-bottom: 1px solid gray;
  padding: 10px 30px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

export default ChannelBrowserCard
