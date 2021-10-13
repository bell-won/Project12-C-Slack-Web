import React from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'

import { COLOR } from '../../../shared/constant/style'
import { ADDRESSBOOK } from '../../../shared/constant/icon'

import Icon from '../../../shared/components/Icon'
import Description from '../../../shared/components/Description'
import Button, { whiteButtonStyle } from '../../../shared/components/Button'

const WorkspaceCard = ({ workspaceName, path }) => {
  const history = useHistory()
  return (
    <StyleDiv>
      <StyledDivLeft>
        <Icon icon={ADDRESSBOOK} customStyle={addIconStyle} />
        <Description customStyle={workspaceNameStyle}>
          {workspaceName}
        </Description>
      </StyledDivLeft>
      <Button
        customStyle={whiteButtonStyle}
        onClick={() => {
          history.push(path)
        }}
      >
        실행
      </Button>
    </StyleDiv>
  )
}
const addIconStyle = {
  fontSize: '48px',
}
const workspaceNameStyle = {
  fontSize: '18px',
  fontWeight: 700,
  margin: '1em 0 1em 8px',
}
const StyleDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0px;
  border-top: 1px solid ${COLOR.LIGHT_GRAY};
  border-bottom: 1px solid ${COLOR.LIGHT_GRAY};
`

const StyledDivLeft = styled.div`
  display: flex;
`

export default WorkspaceCard
