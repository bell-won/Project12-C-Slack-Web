import React from 'react'
import styled from 'styled-components'

import dmTitleGenerator from '../../../util/dmTitleGenerator'
import Image from '../../atom/Image'
import UserActive from '../../atom/UserActive'

function DirectMessageCard({ directMessage }) {
  return (
    <DirectMessageCardLabel>
      <ImgArea>
        {directMessage.member.length <= 1 ? (
          <>
            <Image
              src={directMessage.member[0]?.profileUrl}
              customStyle={singleProfileStyle}
            />
            <UserActive
              customStyle={{
                position: 'absolute',
                right: '-2px',
                bottom: '-2px',
              }}
              isActive={
                directMessage.member[0] && directMessage.member[0]?.isActive
              }
            />
          </>
        ) : (
          <UserProfileImgAndCount size="18">
            <Image
              src={directMessage.member[0]?.profileUrl}
              customStyle={multiProfileStyle}
            />
            <PeopleNum size="14">{directMessage.member.length}</PeopleNum>
          </UserProfileImgAndCount>
        )}
      </ImgArea>
      <TitleLabel>{dmTitleGenerator(directMessage.member)}</TitleLabel>
    </DirectMessageCardLabel>
  )
}
const singleProfileStyle = {
  width: '20px',
  height: '20px',
  borderRadius: '3px',
}
const multiProfileStyle = {
  width: '14px',
  height: '14px',
  borderRadius: '3px',
}
const DirectMessageCardLabel = styled.div`
  width: auto;
  padding: 4px 0;
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
`
const ImgArea = styled.div`
  position: relative;
  width: 25px;
  height: 20px;
  margin-right: 10px;
  border-radius: 3px;
`
const UserProfileImgAndCount = styled.div`
  min-width: 25px;
  width: 18px;
  height: 18px;
`

const PeopleNum = styled.div`
  position: absolute;
  width: 14px;
  height: 14px;
  right: 2px;
  bottom: 0px;
  font-size: 7px;
  line-height: 14px;
  color: white;
  display: flex;
  align-items: baseline;
  justify-content: center;
  background: black;
  border-radius: 5px;
`

const TitleLabel = styled.div`
  width: auto;
  white-space: nowrap;
  text-overflow: ellipsis;
  display: inline-block;
  overflow: hidden;
`

export default DirectMessageCard
