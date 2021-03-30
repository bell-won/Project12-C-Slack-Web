import React from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import Button, { whiteButtonStyle } from '../../atom/Button'
import Description from '../../atom/Description'

const NewWorkspaceSection = () => {
  const history = useHistory()
  return (
    <StyledSection>
      <Description customStyle={customDescriptionStyle}>
        새 워크스페이스 생성
      </Description>
      <Description customStyle={{ fontSize: '14px' }}>
        다른 팀을 위해 새로운 워크스페이스를 생성하려고 하나요?
      </Description>
      <Button
        customStyle={whiteButtonStyle}
        onClick={() => {
          history.push('/create-workspace')
        }}
      >
        새 워크 스페이스 생성
      </Button>
    </StyledSection>
  )
}
const customDescriptionStyle = {
  fontWeight: 700,
  fontSize: '36px',
  margin: '1em 0 1em 0',
}
const StyledSection = styled.section`
  text-align: left;
`

export default NewWorkspaceSection
