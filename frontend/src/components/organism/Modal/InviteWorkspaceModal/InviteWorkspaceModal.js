import React, { useEffect, useState } from 'react'
import Modal from '../../../atom/Modal'
import styled from 'styled-components'
import Button, { whiteButtonStyle } from '../../../atom/Button'
import H, { defaultH1Style } from '../../../atom/H'
import Icon from '../../../atom/Icon'
import { CLOSE } from '../../../../constant/icon'
import { COLOR } from '../../../../constant/style'
import { inviteWorkspace } from '../../../../api/workspace'
import { useParams } from 'react-router-dom'
import { CopyToClipboard } from 'react-copy-to-clipboard'

const baseURL =
  process.env.NODE_ENV === 'development'
    ? process.env.REACT_APP_DEV_API_URL
    : process.env.REACT_APP_API_URL

const InviteWorkspaceModal = ({ handleClose }) => {
  const [inviteURL, setInviteURL] = useState('생성중...')
  const [isHover, setIsHover] = useState(false)
  const [isCopy, setIsCopy] = useState(false)
  const { workspaceId } = useParams()

  useEffect(() => {
    ;(async () => {
      const data = await inviteWorkspace({ workspaceId })
      if (data) setInviteURL(`${baseURL}/api/workspace/invite/${data}`)
      else setInviteURL('초대 링크 생성 실패')
    })()
  }, [])

  const hoverLeave = () => {
    setIsHover(false)
    setIsCopy(false)
  }

  return (
    <>
      <Modal handleClose={handleClose}>
        <StyledModalHeader>
          <H customStyle={defaultH1Style}>Invite to workspace</H>
          <Button customStyle={customButton} onClick={handleClose}>
            <Icon icon={CLOSE} customStyle={closeIconStyle} />
          </Button>
        </StyledModalHeader>
        <StyledModalContent>
          <StyeldTextarea value={inviteURL} readOnly></StyeldTextarea>
          <CopyToClipboard
            text={inviteURL}
            onCopy={() => {
              setIsCopy(true)
            }}
          >
            <CopyDiv
              onMouseEnter={() => setIsHover(true)}
              onMouseLeave={hoverLeave}
            >
              {isHover && isCopy && <CopySpan>Copied!!!</CopySpan>}
              <Button>Copy</Button>
            </CopyDiv>
          </CopyToClipboard>
        </StyledModalContent>
      </Modal>
    </>
  )
}
const customButton = { ...whiteButtonStyle, border: 'none' }
const closeIconStyle = {
  color: COLOR.GRAY,
}
const StyledModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 15px;
`
const StyledModalContent = styled.div`
  padding: 15px;
  text-align: center;
`
const StyeldTextarea = styled.textarea`
  display: inline;
  width: 95%;
  resize: none;
  background: ${COLOR.BACKGROUNT_MODAL_GRAY};
`

const CopyDiv = styled.div`
  position: relative;
  display: inline-block;
`

const CopySpan = styled.span`
  width: 140px;
  background-color: #555;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px;
  position: absolute;
  z-index: 1;
  bottom: 120%;
  left: 50%;
  margin-left: -75px;
  opacity: 1;
  transition: opacity 0.3s;
  ::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: #555 transparent transparent;
  }
`

export default InviteWorkspaceModal
