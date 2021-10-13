import React from 'react'
import styled from 'styled-components'
import { COLOR } from '../../../shared/constant/style'
import Image from '../../../shared/components/Image'
import { go, Lazy, take, map } from '../../../shared/utils/fx'

const MAX_NUMBER_OF_PROFILES = 3
function ChannelMemberThumbnail({ member, memberNum }) {
  return (
    <MemberInfoArea>
      {go(
        member,
        Lazy.map(item => item.profileUrl),
        Lazy.takeNoneDuplicate,
        take(MAX_NUMBER_OF_PROFILES),
        map((user, index) => (
          <Image
            key={index}
            src={user}
            customStyle={{
              ...profileImageStyle,
              zIndex: MAX_NUMBER_OF_PROFILES - index,
            }}
          />
        )),
      )}
      <MemberCountArea>{memberNum}</MemberCountArea>
    </MemberInfoArea>
  )
}

const profileImageStyle = {
  width: '25px',
  height: '25px',
  border: `1px solid ${COLOR.BACKGROUND_CONTENTS}`,
  borderRadius: '4px',
  margin: '0 -5px 0 0',
}

const MemberInfoArea = styled.div`
  display: flex;
  height: 25px;
  margin-right: 10px;
  border-radius: 4px;
  &:hover {
    background: rgba(155, 155, 155, 0.2);
  }
`

const MemberCountArea = styled.div`
  width: 30px;
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
`

export default ChannelMemberThumbnail
