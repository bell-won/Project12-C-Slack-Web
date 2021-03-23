import styled from 'styled-components'

const Description = ({ children, customStyle = {} }) => {
  return <StyledP customStyle={customStyle}>{children}</StyledP>
}
const StyledP = styled.p`
  font-size: ${({ customStyle }) => customStyle.fontSize};
  font-weight: ${({ customStyle }) => customStyle.fontWeight};
  line-height: ${({ customStyle }) => customStyle.lineHeight};
  text-align: ${({ customStyle }) => customStyle.textAlign};
  margin-bottom: ${({ customStyle }) => customStyle.marginBottom};
  margin-left: ${({ customStyle }) => customStyle.marginLeft};
`

export default Description
