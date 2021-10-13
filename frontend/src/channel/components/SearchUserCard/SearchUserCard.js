import React, { useState, useEffect } from 'react'
import styled, { css } from 'styled-components'
import { COLOR } from '../../../shared/constant/style'
import { CHECK } from '../../../shared/constant/icon'
import UserActive from '../../../shared/components/UserActive'
import Icon from '../../../shared/components/Icon'

function SearchUserCard({ userInfo, inviteUserList, setInviteUserList }) {
  const [existList, setExistList] = useState(false)

  useEffect(() => {
    setExistList(false)
    if (inviteUserList.length === 0) return false
    if (!inviteUserList.every(({ _id }) => _id !== userInfo._id))
      setExistList(true)
  }, [inviteUserList, userInfo])

  const addUserEvent = userInfo => {
    if (userInfo.isExist || existList) return false
    setInviteUserList([...inviteUserList, userInfo])
  }

  return (
    <SearchUserCardStyle
      isExist={userInfo.isExist || existList}
      onClick={() => addUserEvent(userInfo)}
    >
      {(existList || userInfo.isExist) && (
        <Icon icon={CHECK} customStyle={checkIconStyle} />
      )}
      <ProfileImg src={userInfo.profileUrl} />
      <DisplayName>{userInfo.displayName}</DisplayName>
      <UserActive isActive={userInfo.isActive} />
      <FullName>{userInfo.fullName}</FullName>
      {userInfo.isExist && (
        <ExistNoticeArea>Already in this channel</ExistNoticeArea>
      )}
    </SearchUserCardStyle>
  )
}

const checkIconStyle = {
  fontSize: '10px',
  padding: '0 5px 0 0',
}

const SearchUserCardStyle = styled.div`
  width: auto;
  height: 30px;
  padding: 3px 10px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  ${({ isExist }) =>
    !isExist
      ? css`
          cursor: pointer;
          &:hover {
            background-color: ${COLOR.LABEL_SELECT_BACKGROUND};
            color: ${COLOR.LABEL_SELECT_TEXT};
          }
        `
      : css`
          &:hover {
            background-color: rgba(255, 255, 255, 0.4);
          }
        `}
`
const ProfileImg = styled.img`
  width: 25px;
  height: 25px;
  border-radius: 5px;
`

const DisplayName = styled.div`
  font-weight: 700;
  margin: 0 10px 0 10px;
`

const FullName = styled.div`
  font-weight: 200;
  margin-left: 10px;
`

const ExistNoticeArea = styled.div`
  position: absolute;
  font-size: 12px;
  font-weight: 200;
  right: 10px;
`

export default SearchUserCard
