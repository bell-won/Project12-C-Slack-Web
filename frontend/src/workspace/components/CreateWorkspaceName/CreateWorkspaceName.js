import React, { useState, useRef } from 'react'
import styled from 'styled-components'

import { debounce } from '../../../shared/utils'
import { checkDuplicateWorkspaceName } from '../../../api/workspace'
import { COLOR } from '../../../shared/constant/style'

import Description from '../../../shared/components/Description'
import Button from '../../../shared/components/Button'
import Input from '../../../shared/components/Input'

const TIME_TO_WAIT_DEBOUNCE = 700
const MAX_WORKSPACE_NAME = 250
const MAXIMUM_NAME_LENGH_ERROR =
  'Workspace names can’t be longer than 250 characters.'
const DUPLICATED_NAME_ERROR = 'That name is already exists'
const NULL_NAME_ERROR = 'workspace names can’t be empty'

const CreateWorkspaceName = ({
  workspaceName,
  setWorkspaceName,
  setIsInputName,
}) => {
  const [nameError, setNameError] = useState(NULL_NAME_ERROR)
  const [isTyping, setIsTyping] = useState(false)
  const checkName = workspaceName => {
    if (
      workspaceName.length > 0 &&
      workspaceName.length <= MAX_WORKSPACE_NAME
    ) {
      return true
    }
    return false
  }
  const goInitChannel = () => {
    if (checkName(workspaceName)) {
      setIsInputName(true)
    }
  }

  const checkDuplicateName = async name => {
    if (!name) return
    const isDuplicateName = (
      await checkDuplicateWorkspaceName({
        name,
      })
    ).data
    if (name && isDuplicateName) {
      setNameError(DUPLICATED_NAME_ERROR)
    }
    setIsTyping(false)
  }

  const handleDebounce = useRef(
    debounce(checkDuplicateName, TIME_TO_WAIT_DEBOUNCE),
  ).current

  const handleName = e => {
    setWorkspaceName(e.target.value)
    setIsTyping(true)
    if (MAX_WORKSPACE_NAME < e.target.value.length) {
      setNameError(MAXIMUM_NAME_LENGH_ERROR)
    } else if (e.target.value.length === 0) {
      setNameError(NULL_NAME_ERROR)
    } else {
      handleDebounce(e.target.value)
      setNameError('')
    }
  }
  return (
    <>
      <Description customStyle={mainDescriptionStyle}>
        회사 또는 팀 이름이 어떻게 됩니까?
      </Description>
      <Description>
        Slack 워크스페이스의 이름이 됩니다. 팀이 인식할 수 있는 이름을
        입력하세요.
      </Description>
      <Input
        handleChange={handleName}
        value={workspaceName}
        maxLength={MAX_WORKSPACE_NAME}
      ></Input>
      <StyledErrorMessage>{nameError}</StyledErrorMessage>
      <StyledDiv>
        <Button onClick={goInitChannel} disabled={!!nameError || isTyping}>
          다음
        </Button>
      </StyledDiv>
    </>
  )
}
const mainDescriptionStyle = {
  fontWeight: 700,
  fontSize: '48px',
  margin: '1em 0 10px 0',
}
const StyledDiv = styled.div`
  margin-top: 30px;
`

const StyledErrorMessage = styled.span`
  display: inline-block;
  font-weight: 700;
  color: ${COLOR.RED};
  word-break: break-all;
`

export default CreateWorkspaceName
