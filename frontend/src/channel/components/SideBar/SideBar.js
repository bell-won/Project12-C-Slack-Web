import React, { Suspense } from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router'
import { useRecoilValue } from 'recoil'

import { sectionsFromChannels, workspaceQuery } from '../../../store'
import {
  EDIT,
  CHEVRONDOWN,
  COMMENTDOTS,
  COMMENTS,
  ELLIPSISV,
  AT,
  BOOKMARK,
} from '../../../shared/constant/icon'
import { COLOR } from '../../../shared/constant/style'

import ChannelSection from '../ChannelSection'
import StaticSideMenuCard from '../StaticSideMenuCard'
import Icon from '../../../shared/components/Icon'
import Button, { whiteButtonStyle } from '../../../shared/components/Button'

function SideBar({ width }) {
  const { workspaceId } = useParams()
  const sections = useRecoilValue(sectionsFromChannels(workspaceId))
  const workspaceUserInfo = useRecoilValue(workspaceQuery(workspaceId))
  return (
    <SideBarContainer width={width}>
      {workspaceUserInfo !== null && (
        <SideBarHeader>
          <WorkspaceName>
            <NameArea>{workspaceUserInfo.workspaceInfo.name}</NameArea>
            <Icon icon={CHEVRONDOWN} customStyle={downIconStyle} />
          </WorkspaceName>
          <Button customStyle={customIconButonStyle}>
            <Icon icon={EDIT} customStyle={editIconStyle} />
          </Button>
        </SideBarHeader>
      )}
      <StaticSideMenuList>
        <StaticSideMenuCard icon={COMMENTDOTS} linkUrl="threads">
          Threads
        </StaticSideMenuCard>
        <StaticSideMenuCard icon={COMMENTS} linkUrl="all-dms">
          All DMs
        </StaticSideMenuCard>
        <StaticSideMenuCard icon={AT} linkUrl="activity-page">
          Mentions & reactions
        </StaticSideMenuCard>
        <StaticSideMenuCard icon={BOOKMARK} linkUrl="saved-page">
          Saved items
        </StaticSideMenuCard>
        <StaticSideMenuCard icon={ELLIPSISV} linkUrl="more">
          More
        </StaticSideMenuCard>
      </StaticSideMenuList>
      {sections.map(([sectionName, channelList], index) => (
        <ChannelSection
          key={index}
          sectionName={sectionName}
          channelList={channelList}
        ></ChannelSection>
      ))}
    </SideBarContainer>
  )
}

const SideBarContainer = styled.aside`
  width: ${({ width }) => width}px;
  background: ${COLOR.BACKGROUND_CHANNEL_LIST};
  color: ${COLOR.LABEL_DEFAULT_TEXT};
  border: 1px solid rgba(255, 255, 255, 0.1);
  overflow-y: auto;
  overflow-x: hidden;
  font-size: 15px;
`
const downIconStyle = {
  color: COLOR.LABEL_SELECT_TEXT,
  fontSize: '10px',
  margin: '10px',
}
const editIconStyle = {
  color: COLOR.ICON,
  fontSize: '13px',
}
const customIconButonStyle = {
  ...whiteButtonStyle,
  width: '35px',
  height: '35px',
  backgroundColor: COLOR.LIGHT_GRAY,
  borderRadius: '20px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}

const SideBarHeader = styled.section`
  display: flex;
  justify-content: space-between;
  padding-left: 20px;
  padding-right: 10px;
  align-items: center;
  height: 60px;
  background: ${COLOR.BACKGROUND_CHANNEL_LIST};
  color: ${COLOR.LABEL_DEFAULT_TEXT};
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-sizing: border-box;
  cursor: pointer;
  &:hover {
    background-color: #303035;
  }
`
const StaticSideMenuList = styled.section`
  width: 100%;
  padding: 6px 0;
`
const WorkspaceName = styled.div`
  font-size: 16px;
  font-weight: 800;
  color: #d1d2d3;
  display: flex;
  align-items: center;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`

const NameArea = styled.div`
  text-overflow: ellipsis;
  overflow: hidden;
`
const Content = ({ width }) => {
  return (
    <Suspense fallback={<SideBarContainer width={width} />}>
      <SideBar width={width} />
    </Suspense>
  )
}
export default Content
