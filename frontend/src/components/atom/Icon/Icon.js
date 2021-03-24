import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const Icon = ({ icon, customStyle = {} }) => {
  return (
    <StyledIcon customStyle={customStyle}>
      <FontAwesomeIcon icon={icon} color={customStyle.color || 'black'} />
    </StyledIcon>
  )
}
const StyledIcon = styled.i`
  display: ${({ customStyle }) => customStyle.display};
  transform: ${({ customStyle }) => customStyle.transform};
  font-size: ${({ customStyle }) =>
    customStyle.fontSize ? customStyle.fontSize : '1rem'};
  padding: ${({ customStyle }) => customStyle.padding};
  margin: ${({ customStyle }) => customStyle.margin};
`
export default Icon
