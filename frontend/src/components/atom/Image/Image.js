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

const StyledImage = styled.img(({ customStyle }) => ({
  width: customStyle.width,
  height: customStyle.height,
  border: customStyle.border,
  borderRadius: customStyle.borderRadius,
  display: customStyle.display,
  position: customStyle.position,
  left: customStyle.left,
  top: customStyle.top,
  margin: customStyle.margin,
  zIndex: customStyle.zIndex,
  cursor: customStyle.cursor,
}))
export default Image
