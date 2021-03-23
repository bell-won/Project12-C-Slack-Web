import React from 'react'
import styled from 'styled-components'
import { COLOR } from '../../constant/style'
import Image from '../../components/atom/Image'
function ChannelMemberThumbnail(props) {
  const { member, memberNum } = props

  const renderThumbnails = member
    .map((user, index) => {
      if (user === null) return
      if (index > 2) return
      return (
        <Image
          key={index}
          src={user.profileUrl}
          customStyle={{ ...customImageStyle, zIndex: 3 - index }}
        />
      )
    })
    .filter(val => val)

  return (
    <MemberInfoArea>
      <ImagesArea>{renderThumbnails}</ImagesArea>
      <MemberCountArea>{memberNum}</MemberCountArea>
    </MemberInfoArea>
  )
}

const customImageStyle = {
  width: '25px',
  height: '25px',
  border: `1px solid ${COLOR.BACKGROUND_CONTENTS}`,
  borderRadius: '4px',
  margin: '0 -5px 0 0',
}

const MemberInfoArea = styled.div`
  width: auto;
  height: 25px;
  margin-right: 10px;
  display: flex;
  flex-direction: row;
  border-radius: 4px;
  &:hover {
    background: rgba(155, 155, 155, 0.2);
  }
`
const ImagesArea = styled.div`
  display: flex;
  flex-direction: row;
`

const MemberCountArea = styled.div`
  width: 30px;
  height: 25px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  line-height: 25px;
  border-radius: 0 4px 4px 0;
`

export default ChannelMemberThumbnail
