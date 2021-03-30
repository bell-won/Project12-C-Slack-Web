import React, { useState } from 'react'
import { useParams } from 'react-router'
import { useSetRecoilState } from 'recoil'
import styled, { keyframes, css } from 'styled-components'
import { Link } from 'react-router-dom'
import Icon from '../../atom/Icon'
import Button from '../../atom/Button'
import ChannelCard from '../../molecule/ChannelCard'
import DirectMessageCard from '../../molecule/DirectMessageCard'
import InviteWorkspaceModal from '../Modal/InviteWorkspaceModal'
import CreateChannelModal from '../Modal/CreateChannelModal/CreateChannelModal'
import ChannelBrowserModal from '../Modal/ChannelBrowserModal'
import InviteUserToChannelModal from '../Modal/InviteUserToChannelModal'
import {
  ELLIPSISV,
  PLUS,
  LOCK,
  HASHTAG,
  PLUSSQURE,
} from '../../../constant/icon'
import { COLOR } from '../../../constant/style'
import { modalRecoil } from '../../../store'

const DM_SECTION = 'Direct messages'
const CHANNEL_SECTION = 'Channels'
function SectionLabel({ sectionName, channelList = [] }) {
  const [isOpen, setIsOpen] = useState(true)
  const { channelId, workspaceId } = useParams()
  const setModal = useSetRecoilState(modalRecoil)
  const openSection = () => {
    setIsOpen(!isOpen)
  }

  const openChannelsMenu = e => {
    e.stopPropagation()
  }

  const openAddUserModal = e => {
    e.stopPropagation()
    setModal(
      <InviteUserToChannelModal type="DM" handleClose={() => setModal(null)} />,
    )
  }

  const openCreateChannelModal = () => {
    setModal(<CreateChannelModal handleClose={() => setModal(null)} />)
  }

  const openInviteWorkspaceModal = () => {
    setModal(<InviteWorkspaceModal handleClose={() => setModal(null)} />)
  }

  const openChannelBrowserModal = e => {
    e.stopPropagation()
    setModal(<ChannelBrowserModal handleClose={() => setModal(null)} />)
  }

  const getInviteModalButton = () => {
    if (sectionName === DM_SECTION)
      return (
        <Button
          customStyle={customButtonStyle}
          onClick={openInviteWorkspaceModal}
        >
          <ChannelCard
            icon={PLUSSQURE}
            title="Add teammates"
            color={COLOR.LABEL_DEFAULT_TEXT}
          />
        </Button>
      )
    if (sectionName === CHANNEL_SECTION)
      return (
        <Button
          customStyle={customButtonStyle}
          onClick={openCreateChannelModal}
        >
          <ChannelCard
            icon={PLUSSQURE}
            title="Add channels"
            color={COLOR.LABEL_DEFAULT_TEXT}
          />
        </Button>
      )
  }

  return (
    <SectionLabelStyle>
      <TitleArea onClick={openSection}>
        <IconArea>
          <TriangleIcon isOpen={isOpen}>▶</TriangleIcon>
        </IconArea>
        <SectionTitle>
          <SectionName>{sectionName}</SectionName>
          <ButtonArea>
            <ChannelSectionBtn onClick={openChannelsMenu}>
              <Icon icon={ELLIPSISV} customStyle={customIconStyle} />
            </ChannelSectionBtn>
            {sectionName === CHANNEL_SECTION && (
              <ChannelSectionBtn onClick={openChannelBrowserModal}>
                <Icon icon={PLUS} customStyle={customIconStyle} />
              </ChannelSectionBtn>
            )}
            {sectionName === DM_SECTION && (
              <ChannelSectionBtn onClick={openAddUserModal}>
                <Icon icon={PLUS} customStyle={customIconStyle} />
              </ChannelSectionBtn>
            )}
          </ButtonArea>
        </SectionTitle>
      </TitleArea>
      <ListArea isOpen={isOpen}>
        {channelList.map(
          ({ channelId: { _id, channelType, title, member } }, idx) => (
            <LinkStyle key={idx} to={`/workspace/${workspaceId}/${_id}`}>
              <ChannelLabel curr={_id === channelId} isOpen={isOpen}>
                {channelType === 2 ? (
                  <DirectMessageCard
                    directMessage={{ _id, channelType, title, member }}
                  />
                ) : (
                  <ChannelCard
                    icon={channelType === 0 ? LOCK : HASHTAG}
                    title={title}
                    color={
                      _id === channelId ? 'white' : COLOR.LABEL_DEFAULT_TEXT
                    }
                  />
                )}
              </ChannelLabel>
            </LinkStyle>
          ),
        )}
        {isOpen && getInviteModalButton()}
      </ListArea>
    </SectionLabelStyle>
  )
}
const customIconStyle = {
  color: COLOR.LABEL_DEFAULT_TEXT,
  fontSize: '13px',
}
const customButtonStyle = {
  padding: '3px 10px 3px 30px',
  hoverBackgroundColor: COLOR.LABEL_HOVER_BACKGROUND,
  color: COLOR.LABEL_DEFAULT_TEXT,
  backgroundColor: 'transparent',
  borderRadius: 'initial',
  fontWeight: 'initial',
}

const ChannelLabel = styled.div`
  width: auto;
  padding: 3px 10px 3px 30px;

  cursor: pointer;
  &:hover {
    background-color: ${props => {
      if (!props.curr) return COLOR.LABEL_HOVER_BACKGROUND
      return null
    }};
  }
  display: ${props => {
    if (!props.isOpen && !props.curr) {
      return 'none'
    }
  }};
  background: ${props => {
    if (props.curr) {
      return COLOR.LABEL_SELECT_BACKGROUND
    }
  }};
  color: ${props => {
    if (props.curr) {
      return COLOR.LABEL_SELECT_TEXT
    } else {
      return COLOR.LABEL_DEFAULT_TEXT
    }
  }};
`

const SectionLabelStyle = styled.div`
  width: auto;
  padding: 6px 0;
  color: ${COLOR.LABEL_DEFAULT_TEXT};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`

const LinkStyle = styled(Link)`
  text-decoration: none;
`

const IconArea = styled.div`
  width: 18px;
  height: 18px;
  padding: 4px;
`
const TriangleIcon = styled.div`
  width: 18px;
  height: 18px;
  text-align: center;
  transform: rotate(90deg);
  ${({ isOpen }) =>
    isOpen
      ? css`
          animation: 0.1s linear ${openSection};
          animation-direction: alternate;
          animation-fill-mode: forwards;
        `
      : css`
          animation: 0.1s linear ${closeSection};
          animation-direction: alternate;
          animation-fill-mode: forwards;
        `}
`
const SectionTitle = styled.div`
  width: calc(100% - 25px);
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const SectionName = styled.div`
  padding-left: 10px;
  word-break: break-all;
  display: inline-block;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`

const ChannelSectionBtn = styled.div`
  opacity: 0;
  width: auto;
  min-width: 18px;
  height: 18px;
  text-align: center;
  padding: 4px;
  display: block;
  border-radius: 3px;
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`

const showButton = keyframes`
  0% {
    opacity:0;
  }
  50% {
    opacity:0;
  }
  100% {
    opacity:100;
  }`

const ButtonArea = styled.div`
  display: none;
  flex-direction: row;
`

const TitleArea = styled.div`
  width: auto;
  padding: 2px 10px;
  user-select: none;
  display: flex;
  align-items: baseline;
  flex-direction: row;

  cursor: pointer;
  &:hover {
    ${ChannelSectionBtn} {
      animation: 0.2s linear ${showButton};
      animation-direction: alternate;
      animation-fill-mode: forwards;
    }
    ${ButtonArea} {
      display: flex;
    }
  }
`

const ListArea = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

const openSection = keyframes`
  0% {
    transform: rotate( 0deg);
  }
  100% {
    transform: rotate( 90deg);
  }`

const closeSection = keyframes`
0% {
  transform: rotate( 90deg);
}
100% {
  transform: rotate( 0deg);
}`

export default SectionLabel
