import React, { useState } from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router'
import { toast } from 'react-toastify'

import request from '../../../shared/utils/request'
import { COLOR } from '../../../shared/constant/style'

import Description from '../../../shared/components/Description'
import Button from '../../../shared/components/Button'
import Input from '../../../shared/components/Input'

const MAX_CHANNEL_NAME = 80
const MAXIMUM_NAME_LENGH_ERROR =
  'channel names can’t be longer than 80 characters.'
const NULL_NAME_ERROR = 'channel names can’t be empty'

const CreateWorkspaceInitChannel = ({ workspaceName }) => {
  const history = useHistory()
  const [nameError, setNameError] = useState(NULL_NAME_ERROR)
  const [channelName, setChannelName] = useState('')
  const checkChannelName = channelName => {
    if (channelName.length > 0 && channelName.length <= MAX_CHANNEL_NAME) {
      return true
    }
    return false
  }
  const createWorkspace = async channelName => {
    try {
      if (checkChannelName(channelName)) {
        const { data } = await request.POST('/api/workspace', {
          name: workspaceName,
          channelName: channelName,
        })
        history.push(
          `/workspace/${data.data.workspaceId}/${data.data.channelId}`,
        )
      }
    } catch (err) {
      toast.error('워크스페이스 생성에 실패하였습니다.', {
        onClose: () => history.go(0),
      })
    }
  }

  const handleName = e => {
    setChannelName(e.target.value)
    if (MAX_CHANNEL_NAME < e.target.value.length) {
      setNameError(MAXIMUM_NAME_LENGH_ERROR)
    } else if (e.target.value.length === 0) {
      setNameError(NULL_NAME_ERROR)
    } else if (e.target.value.length > 0) {
      setNameError('')
    }
  }
  return (
    <>
      <Description customStyle={mainDescriptionStyle}>
        현재 고객님의 팀은 어떤 일을 진행하고 계시나요?
      </Description>
      <Description>
        프로젝트, 캠페인, 이벤트 또는 성사하려는 거래 등 무엇이든 될 수
        있습니다.
      </Description>
      <Input
        handleChange={handleName}
        value={channelName}
        maxLength={MAX_CHANNEL_NAME}
      ></Input>
      <StyledErrorMessage>{nameError}</StyledErrorMessage>
      <StyledDiv>
        <Button
          onClick={() => createWorkspace(channelName)}
          disabled={!!nameError}
        >
          생성
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

export default CreateWorkspaceInitChannel
