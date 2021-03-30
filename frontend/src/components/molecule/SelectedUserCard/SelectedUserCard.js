import React from 'react'
import styled from 'styled-components'
import Image from '../../atom/Image'

import { COLOR } from '../../../constant/style'
import Icon from '../../atom/Icon'
import Button from '../../atom/Button'
import { CLOSE } from '../../../constant/icon'

function SelectedUserCard({ userInfo, handleClick }) {
  const handleClickWrapper = () => handleClick(userInfo._id)
  return (
    <Button customStyle={closeButtonStyle} onClick={handleClickWrapper}>
      <Image src={userInfo.profileUrl} customStyle={profileImageStyle} />
      <DisplayName>{userInfo.displayName}</DisplayName>
      <Icon icon={CLOSE} customStyle={closeIconStyle} />
    </Button>
  )
}
const closeIconStyle = {
  fontSize: '15px',
  margin: '0 10px 0 5px',
}
const profileImageStyle = {
  width: '35px',
  height: '35px',
}
const DisplayName = styled.div`
  padding: 0 5px;
`
const closeButtonStyle = {
  display: 'flex',
  height: '35px',
  padding: 0,
  margin: '3px',
  border: 'none',
  fontWeight: 600,
  color: 'inherit',
  alignItems: 'center',
  backgroundColor: COLOR.BACKGROUNT_SELECTED_USER_CARD,
  hoverBackgroundColor: COLOR.RUBY,
}

export default SelectedUserCard
