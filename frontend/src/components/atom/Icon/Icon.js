import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const Icon = ({ icon, customStyle = {}, onClick }) => {
  return (
    <StyledIcon customStyle={customStyle} onClick={onClick}>
      <FontAwesomeIcon icon={icon} color={customStyle.color || 'black'} />
    </StyledIcon>
  )
}
const StyledIcon = styled.i(({ customStyle }) => ({
  display: customStyle.display,
  width: customStyle.width,
  transform: customStyle.transform,
  fontSize: customStyle.fontSize ? customStyle.fontSize : '1rem',
  padding: customStyle.padding,
  margin: customStyle.margin,
  cursor: customStyle.cursor,
}))
export default Icon
