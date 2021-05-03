import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useParams, Route } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { modalRecoil, useInitializeAtoms } from '../../store'

import SideBar from '../../components/organism/SideBar'
import ChatRoom from '../../components/organism/ChatRoom'
import ThreadSideBar from '../../components/organism/ThreadSideBar'
import { COLOR } from '../../constant/style'
import Icon from '../../components/atom/Icon'
import { TOOLS } from '../../constant/icon'
import DraggableBoundaryLine from '../../components/molecule/DraggableBoundaryLine'
import GlobalHeader from '../../components/organism/GlobalHeader'

function WorkspacePage() {
  const { channelId, workspaceId } = useParams()
  const [listWidth, setListWidth] = useState(250)
  const [sidebarWidth, setSidebarWidth] = useState(0)
  const modal = useRecoilValue(modalRecoil)
  useInitializeAtoms(workspaceId)
  useEffect(() => {
    if (Notification.permission !== 'denied') {
      Notification.requestPermission()
    }
  }, [])

  const switching = () => {
    switch (channelId) {
      case 'threads':
        return ConstructionPage()
      case 'all-dms':
        return ConstructionPage()
      case 'saved-page':
        return ConstructionPage()
      case 'activity-page':
        return ConstructionPage()
      case 'more':
        return ConstructionPage()
      default:
        return <ChatRoom width={sidebarWidth} />
    }
  }
  return (
    <PageStyle>
      {modal}
      <GlobalHeader />
      <MainArea>
        <SideBar width={listWidth} />
        <DraggableBoundaryLine setWidth={setListWidth} min="150" max="450" />
        <ContentsArea width={listWidth}>
          {switching()}

          <Route exact path={'/workspace/:workspaceId/:channelId/:chatId'}>
            <ThreadSideBar
              sidebarWidth={sidebarWidth}
              setSidebarWidth={setSidebarWidth}
            />
          </Route>
        </ContentsArea>
      </MainArea>
    </PageStyle>
  )
}

const ConstructionPage = () => {
  return (
    <SwitchContentsArea>
      <p>
        <Icon icon={TOOLS} customStyle={customIconStyle} />
      </p>
      <p>준비 중인 페이지입니다.</p>
    </SwitchContentsArea>
  )
}

const customIconStyle = {
  fontSize: '100px',
  color: COLOR.LABEL_SELECT_TEXT,
}
const PageStyle = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`

const MainArea = styled.div`
  display: flex;
  width: 100%;
  height: calc(100% - 40px);
`

const ContentsArea = styled.div`
  display: flex;
  width: ${props => `calc(100% - ${props.width}px)`};
  height: 100%;
`
const SwitchContentsArea = styled.div`
  height: 100%;
  width: 100%;
  font-size: 20px;
  color: ${COLOR.LABEL_DEFAULT_TEXT};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${COLOR.BACKGROUND_CONTENTS};
`

export default WorkspacePage
