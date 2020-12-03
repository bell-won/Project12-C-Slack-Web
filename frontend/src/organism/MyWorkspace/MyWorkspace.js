import React from 'react'
import Icon from '../../atom/Icon'
import { ADDRESSBOOK } from '../../constant/icon'
import styled from 'styled-components'
import MainDescription from '../../atom/MainDescription'
import Button from '../../atom/Button'
import { COLOR } from '../../constant/style'
import { useHistory } from 'react-router-dom'

const MyWorkspace = ({ workspaceName, path }) => {
  const history = useHistory()
  return (
    <>
      <StyleDiv>
        <StyledDivLeft>
          <Icon icon={ADDRESSBOOK} size="48px" />
          <MainDescription fontSize="18px">{workspaceName}</MainDescription>
        </StyledDivLeft>
        <Button
          type="transparent"
          handleClick={() => {
            history.push(path)
          }}
        >
          실행
        </Button>
      </StyleDiv>
    </>
  )
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

export default MyWorkspace
