import styled from 'styled-components'

const Description = ({ children, customStyle = {} }) => {
  return <StyledP customStyle={customStyle}>{children}</StyledP>
}
const StyledP = styled.p(
  ({
    customStyle: { fontSize, fontWeight, lineHeight, textAlign, margin },
  }) => ({
    fontSize,
    fontWeight,
    lineHeight,
    textAlign,
    margin,
  }),
)

export default Description
