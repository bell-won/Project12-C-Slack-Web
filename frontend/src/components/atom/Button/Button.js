import React from 'react'
import styled from 'styled-components'
import { COLOR } from '../../../constant/style'

const Button = ({ children, disabled = false, onClick, customStyle = {} }) => {
  return (
    <StyledButton
      onClick={onClick}
      customStyle={customStyle}
      disabled={disabled}
    >
      {children}
    </StyledButton>
  )
}

const defaultButton = styled.button`
  height: 36px;
  width: auto;
  padding: 0 12px 1px;
  font-size: 15px;
  font-weight: 900;
  border-radius: 4px;
  border-style: none;
  cursor: pointer;
  color: ${COLOR.WHITE};
  background-color: ${COLOR.GREEN};
  outline: none;
  &:hover {
    ${({ disabled }) => {
      if (!disabled)
        return `background: ${COLOR.HOVER_GREEN}; 
                box-shadow: 0 1px 4px rgba(0,0,0,0.3)`
    }}
  }
`
const StyledButton = styled(defaultButton)(({ customStyle, disabled }) => ({
  display: customStyle.display,
  justifyContent: customStyle.justifyContent,
  alignItems: customStyle.alignItems,
  height: customStyle.height,
  width: customStyle.width,
  padding: customStyle.padding,
  margin: customStyle.margin,
  border: customStyle.border,
  borderStyle: customStyle.borderStyle,
  borderRadius: customStyle.borderRadius || '4px',
  boxSizing: customStyle.boxSizing,
  color: disabled ? COLOR.GRAY : customStyle.color,
  cursor: disabled ? 'default' : 'pointer',
  backgroundColor: disabled ? COLOR.LIGHT_GRAY : customStyle.backgroundColor,
  fontWeight: customStyle.fontWeight,
  fontSize: customStyle.fontSize,
  '&:hover': disabled
    ? { cursor: 'default' }
    : {
        backgroundColor: customStyle.hoverBackgroundColor,
        border: customStyle.hoverBorder,
        boxShadow: customStyle.hoverBoxShadow,
        color: customStyle.hoverColor,
      },
  '&:active': {
    backgroundColor: customStyle.activeBackgroundColor,
  },
}))

export const whiteButtonStyle = {
  color: 'GRAY',
  backgroundColor: 'transparent',
  border: `1px solid ${COLOR.TRANSPARENT_GRAY};`,
  hoverBackgroundColor: COLOR.HOVER_GRAY,
  hoverBoxShadow: '0 1px 4px rgba(0,0,0,0.3);',
}
export default Button
