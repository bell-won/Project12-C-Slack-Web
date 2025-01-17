import React, { memo } from 'react'
import styled from 'styled-components'

import calculateTime from '../../utils/calculateTime'
import { go, Lazy, take, map } from '../../../shared/utils/fx'
import { COLOR } from '../../../shared/constant/style'

import Image from '../../../shared/components/Image'
import Button, { whiteButtonStyle } from '../../../shared/components/Button'

const MAX_NUMBER_OF_PROFILES = 5
const ViewThreadButton = memo(({ reply = [] }) => {
  const [lastReply] = reply.slice(-1)
  return (
    <Button customStyle={viewThreadButtonStyle}>
      {go(
        reply,
        Lazy.map(item => item?.userInfo?.profileUrl),
        Lazy.takeNoneDuplicate,
        take(MAX_NUMBER_OF_PROFILES),
        map((item, index) => (
          <Image key={index} src={item} customStyle={profileImageStyle} />
        )),
      )}
      <ReplyCounts>
        {reply.length} {reply.length === 1 ? 'reply ' : 'replies '}
        <LastModifiedTime>
          {calculateTime(lastReply?.createdAt)}
        </LastModifiedTime>
      </ReplyCounts>
    </Button>
  )
})
const profileImageStyle = {
  width: '24px',
  height: '24px',
  borderRadius: '3px',
}
const viewThreadButtonStyle = {
  ...whiteButtonStyle,
  border: 'none',
  color: 'inherit',
  hoverBoxShadow: 'initial',
  fontWeight: 'initial',
  hoverBackgroundColor: 'initial',
  display: 'flex',
  padding: 'initial',
  alignItems: 'center',
  height: 'inherit',
}
const ReplyCounts = styled.div`
  margin-left: 5px;
`
const LastModifiedTime = styled.span`
  color: ${COLOR.GRAY};
`
export default ViewThreadButton
