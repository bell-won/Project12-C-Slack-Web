import styled from 'styled-components'

const Description = ({ children, customStyle = {} }) => {
  return <StyledP customStyle={customStyle}>{children}</StyledP>
}
const StyledP = styled.p(({ customStyle }) => ({
  fontSize: customStyle.fontSize,
  fontWeight: customStyle.fontWeight,
  lineHeight: customStyle.lineHeight,
  textAlign: customStyle.textAlign,
  margin: customStyle.margin,
  overflow: customStyle.overflow,
  textOverflow: customStyle.textOverflow,
  whiteSpace: customStyle.whiteSpace,
  padding: customStyle.padding,
}))

export default Description
