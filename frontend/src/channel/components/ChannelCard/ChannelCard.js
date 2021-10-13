import React from 'react'
import styled from 'styled-components'

import Icon from '../../../shared/components/Icon'

function ChannelCard({ title, color, icon }) {
  return (
    <ChannelCardLabel>
      <Icon icon={icon} customStyle={{ ...customIconStyle, color }} />
      <TitleLabel color={color}>{title}</TitleLabel>
    </ChannelCardLabel>
  )
}
const customIconStyle = {
  padding: '0 10px 0 0',
  fontSize: '13px',
}
const ChannelCardLabel = styled.div`
  width: auto;
  padding: 4px 0;
  display: flex;
  align-items: center;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`

const TitleLabel = styled.div`
  width: auto;
  color: ${props => props.color};
  display: inline-block;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`

export default ChannelCard
