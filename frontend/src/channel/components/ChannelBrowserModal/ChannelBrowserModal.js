import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useRecoilValue } from 'recoil'
import ChannelBrowserCard from '../ChannelBrowserCard'
import { useParams } from 'react-router-dom'

import { workspaceQuery } from '../../../store'
import { getChannelBrowserData } from '../../../api/channel'
import { CLOSE } from '../../../shared/constant/icon'
import { COLOR } from '../../../shared/constant/style'
import Modal from '../../../shared/components/Modal'
import H, { defaultH1Style } from '../../../shared/components/H'
import Icon from '../../../shared/components/Icon'
import Button, { whiteButtonStyle } from '../../../shared/components/Button'

function ChannelBrowserModal({ handleClose }) {
  const [channelList, setChannelList] = useState([])
  const { workspaceId } = useParams()
  const workspaceUserInfo = useRecoilValue(workspaceQuery(workspaceId))

  useEffect(() => {
    if (workspaceUserInfo) {
      ;(async () => {
        const channelList = await getChannelBrowserData({
          workspaceUserInfoId: workspaceUserInfo._id,
          workspaceId,
        })
        setChannelList(channelList)
      })()
    }
  }, [workspaceUserInfo])

  return (
    <Modal>
      <ChannelBrowserModalStyle>
        <Header>
          <H customStyle={defaultH1Style}>Channel Browser</H>
          <Button customStyle={customButtonStyle} onClick={handleClose}>
            <Icon icon={CLOSE} customStyle={closeIconStyle} />
          </Button>
        </Header>
        <ChannelListArea>
          {channelList?.map((el, idx) => (
            <ChannelBrowserCard
              key={idx}
              {...el}
              handleClose={handleClose}
              workspaceUserInfoId={workspaceUserInfo._id}
            />
          ))}
        </ChannelListArea>
        <CloseBtnArea>
          <Button onClick={handleClose} children="Close" />
        </CloseBtnArea>
      </ChannelBrowserModalStyle>
    </Modal>
  )
}
const customButtonStyle = { ...whiteButtonStyle, border: 'none' }
const closeIconStyle = {
  color: COLOR.GRAY,
}
const ChannelBrowserModalStyle = styled.div`
  height: 500px;
  display: flex;
  flex-direction: column;
`
const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 30px 30px;
`

const ChannelListArea = styled.div`
  width: 70%;
  height: 330px;
  border: 1px solid black;
  border-radius: 5px;
  overflow-y: auto;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`

const CloseBtnArea = styled.div`
  width: auto;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding: 20px 50px 0 0;
`
export default ChannelBrowserModal
