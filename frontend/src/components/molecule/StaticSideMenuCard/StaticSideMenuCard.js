import React from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Icon from '../../atom/Icon'
import Description from '../../atom/Description'

function StaticSideMenuCard({ icon, children, linkUrl }) {
  const parameters = useParams()
  return (
    <LinkStyle
      to={'/workspace/' + parameters.workspaceId + '/' + linkUrl}
      $currentChannel={parameters.channelId === linkUrl}
    >
      <Icon
        icon={icon}
        customStyle={{
          ...iconStyle,
          color: parameters.channelId === linkUrl ? 'white' : '#a3a3a6',
        }}
      />
      <Description customStyle={descriptionStyle}>{children}</Description>
    </LinkStyle>
  )
}

const LinkStyle = styled(Link)`
  padding: 4px 10px;
  text-align: center;
  text-decoration: none;
  display: flex;
  align-items: baseline;
  user-select: none;
  cursor: pointer;
  &:hover {
    background-color: ${({ $currentChannel }) =>
      !$currentChannel && 'rgba(255, 255, 255, 0.1)'};
  }
  background: ${({ $currentChannel }) => $currentChannel && '#1363A2'};
  color: ${({ $currentChannel }) => ($currentChannel ? 'white' : '#a3a3a6')};
`
const iconStyle = {
  padding: '0 4px',
  width: '18px',
}
const descriptionStyle = {
  margin: '0 0 0 10px',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
}

export default StaticSideMenuCard
