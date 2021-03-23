import React from 'react'
import styled from 'styled-components'

const Image = ({ onClick, src, alt, title, customStyle = {} }) => {
  return (
    <StyledImage
      onClick={onClick}
      src={src}
      alt={alt}
      title={title}
      customStyle={customStyle}
    />
  )
}

const StyledImage = styled.img`
  width: ${({ customStyle }) => customStyle.width};
  height: ${({ customStyle }) => customStyle.height};
  border-radius: ${({ customStyle }) => customStyle.borderRadius};
  display: ${({ customStyle }) => customStyle.display};
  position: ${({ customStyle }) => customStyle.position};
  left: ${({ customStyle }) => customStyle.left};
  top: ${({ customStyle }) => customStyle.top};
  cursor: ${({ customStyle }) => customStyle.cursor};
`
export default Image
