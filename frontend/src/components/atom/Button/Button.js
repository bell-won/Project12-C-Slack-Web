import React from 'react'
import styled from 'styled-components'
import { COLOR } from '../../../constant/style'

const Button = ({
  handleClick,
  children,
  disabled = false,
  onClick,
  customStyle = {},
}) => {
  return (
    <StyledButton
      onClick={handleClick || onClick}
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

const StyledButton = styled(defaultButton)`
  display: ${({ customStyle }) => customStyle.display};
  justify-content: ${({ customStyle }) => customStyle.justifyContent};
  align-items: ${({ customStyle }) => customStyle.alignItems};
  height: ${({ customStyle }) => customStyle.height};
  width: ${({ customStyle }) => customStyle.width};
  padding: ${({ customStyle }) => customStyle.padding};
  border: ${({ customStyle }) => customStyle.border};
  border-style: ${({ customStyle }) => customStyle.borderStyle};
  border-radius: ${({ customStyle }) => customStyle.borderRadius || '4px'};
  color: ${({ customStyle, disabled }) =>
    disabled ? COLOR.GRAY : customStyle.color};
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  background-color: ${({ customStyle, disabled }) =>
    disabled ? COLOR.LIGHT_GRAY : customStyle.backgroundColor};
  font-weight: ${({ customStyle }) => customStyle.fontWeight};
  font-size: ${({ customStyle }) => customStyle.fontSize};
  &:hover {
    ${({ customStyle, disabled }) =>
      disabled
        ? 'cursor: default;'
        : `
        background-color:${customStyle.hoverBackgroundColor || ''};
        border: ${customStyle.hoverBorder || ''};
        box-shadow: ${customStyle.hoverBoxShadow || ''};
        color: ${customStyle.hoverColor || ''};
        `};
  }
  &:active {
    background-color: ${({ customStyle }) => customStyle.activeBackgroundColor};
  }
`

export const whiteButtonStyle = {
  color: 'GRAY',
  backgroundColor: 'transparent',
  border: `1px solid ${COLOR.TRANSPARENT_GRAY};`,
  hoverBackgroundColor: COLOR.HOVER_GRAY,
  hoverBoxShadow: '0 1px 4px rgba(0,0,0,0.3);',
}
export default Button
