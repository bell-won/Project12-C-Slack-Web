import React from 'react'
import styled from 'styled-components'
import { useSetRecoilState, useRecoilValue } from 'recoil'
import { useParams } from 'react-router-dom'

import { modalRecoil, channelInfoQuery } from '../../../store'
import dmTitleGenerator from '../../utils/dmTitleGenerator'
import {
  ADDUSER,
  INFOCIRCLE,
  LOCK,
  HASHTAG,
} from '../../../shared/constant/icon'
import { COLOR } from '../../../shared/constant/style'
import { isEmpty } from '../../../shared/utils'
import { THUMBTACK } from '../../../shared/constant/icon'

import Icon from '../../../shared/components/Icon'
import ChannelCard from '../ChannelCard'
import ChannelStarButton from '../ChannelStarButton'
import ChannelTopicButton from '../ChannelTopicButton'
import ChannelMemberThumbnail from '../ChannelMemberThumbnail'
import InviteUserToChannelModal from '../InviteUserToChannelModal'

function ChannelHeader() {
  const setModal = useSetRecoilState(modalRecoil)
  const { workspaceId, channelId } = useParams()
  const channelInfo = useRecoilValue(
    channelInfoQuery({ workspaceId, channelId }),
  )
  const openAddUserModal = () => {
    setModal(<InviteUserToChannelModal handleClose={() => setModal(null)} />)
  }
  return isEmpty(channelInfo) ? null : (
    <ChannelHeaderStyle>
      <ChannelInfo>
        <MainInfo>
          <ChannelCard
            icon={channelInfo.channelId.channelType === 0 ? LOCK : HASHTAG}
            color={COLOR.LABEL_SELECT_TEXT}
            title={
              channelInfo.channelId.channelType === 2
                ? dmTitleGenerator(channelInfo.member)
                : channelInfo.channelId.title
            }
          />
          <ChannelStarButton channel={channelInfo} />
        </MainInfo>
        <SubInfo>
          {channelInfo.pinnedCount !== 0 && (
            <>
              <Icon icon={THUMBTACK} customStyle={pinIconStyle} />
              {channelInfo.pinnedCount}
              <Divider>|</Divider>
            </>
          )}
          <ChannelTopicButton topic={channelInfo.channelId.topic} />
        </SubInfo>
      </ChannelInfo>
      <ChannelButtonArea>
        <ChannelMemberInfo color={COLOR.LABEL_SELECT_SUB_TEXT}>
          <ChannelMemberThumbnail
            member={channelInfo.member}
            memberNum={channelInfo.member.length}
          />
        </ChannelMemberInfo>
        <IconBtn onClick={openAddUserModal}>
          <Icon icon={ADDUSER} customStyle={channelOptionIconStyle} />
        </IconBtn>
        <IconBtn>
          <Icon icon={INFOCIRCLE} customStyle={channelOptionIconStyle} />
        </IconBtn>
      </ChannelButtonArea>
    </ChannelHeaderStyle>
  )
}
const channelOptionIconStyle = {
  color: COLOR.LABEL_SELECT_SUB_TEXT,
}
const pinIconStyle = {
  fontSize: '12px',
  transform: 'rotate(-30deg)',
  padding: '2px 0 0 5px',
  margin: '0 10px 0 0',
  display: 'inline-block',
  color: COLOR.LABEL_SELECT_SUB_TEXT,
}
const ChannelHeaderStyle = styled.div`
  width: 100%;
  height: auto;
  margin: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
`

const ChannelInfo = styled.div`
  height: 100%;
  margin-right: 5px;
  display: flex;
  flex-direction: column;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`

const MainInfo = styled.div`
  width: 100%;
  font-weight: 800;
  font-size: 17px;
  display: flex;
  align-items: center;

  cursor: pointer;
`

const SubInfo = styled.div`
  width: 100%;
  height: 100%;
  color: ${COLOR.LABEL_SELECT_SUB_TEXT};
  font-size: 13px;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
`

const Divider = styled.div`
  margin: 0 10px;
`

const ChannelButtonArea = styled.div`
  width: 180px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const ChannelMemberInfo = styled.div`
  display: flex;
  justify-content: center;
  color: ${({ color }) => color};
  cursor: pointer;
`

const IconBtn = styled.div`
  width: 30px;
  height: 30px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  cursor: pointer;

  &:hover {
    background: rgba(155, 155, 155, 0.2);
  }
`

export default ChannelHeader
