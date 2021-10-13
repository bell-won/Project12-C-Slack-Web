import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import { COLOR } from '../../../shared/constant/style'
import { PAPERPLANE } from '../../../shared/constant/icon'

import Input from '../../../shared/components/Input'
import Icon from '../../../shared/components/Icon'
import Button from '../../../shared/components/Button'
import FileUploader from '../FileUploader'
import FilePreview from '../FilePreview'

function MessageEditor({ sendMessage, placeholder }) {
  const [message, setMessage] = useState('')
  const [file, setFile] = useState(null)
  const [isRender, setIsRender] = useState(false)
  const [isSend, setIsSend] = useState(false)

  useEffect(() => {
    if (file) {
      setIsRender(true)
      setIsSend(true)
    }
  }, [file])

  const handleInput = e => {
    setMessage(e.target.value)
    if (e.target.value.length > 0) setIsSend(true)
    else setIsSend(false)
  }

  const sendMessageHanle = () => {
    sendMessage(message, file)
    setMessage('')
    setFile(null)
    setIsRender(false)
    setIsSend(false)
  }

  const handleKey = e => {
    if (e.key === 'Enter' && (e.target.value || file)) {
      sendMessageHanle()
    }
  }

  const renderPreview = () => {
    return (
      <div>
        <FilePreview
          type="input"
          file={file}
          setFile={setFile}
          setIsRender={setIsRender}
        />
      </div>
    )
  }

  return (
    <MessageEditorContainer>
      <EditorArea>
        <Input
          placeholder={placeholder}
          handleChange={handleInput}
          handleKey={handleKey}
          value={message}
          type="messageEditor"
        />
        {isRender && renderPreview()}
      </EditorArea>
      <StyledDiv>
        <FileUploader file={file} setFile={setFile} />
        <Button onClick={sendMessageHanle} disabled={!isSend}>
          <Icon icon={PAPERPLANE} customStyle={customIconStyle} />
        </Button>
      </StyledDiv>
      {/* TODO markdown, chat action 적용 필요 */}
    </MessageEditorContainer>
  )
}
const customIconStyle = {
  color: 'white',
}
const MessageEditorContainer = styled.div`
  padding: 20px;
  background-color: ${COLOR.WHITE};
`

const StyledDiv = styled.div`
  float: right;
  margin-top: 5px;
`
const EditorArea = styled.div`
  &:focus-within {
    box-shadow: 0 0 0 1px rgba(18, 100, 163, 1),
      0 0 0 5px rgba(29, 155, 209, 0.3);
    border-radius: 4px;
    border-color: transparent;
  }
  &:focus-within > div {
    display: block;
  }
  border: 1px solid ${COLOR.TRANSPARENT_GRAY};
  border-radius: 4px;
`
export default MessageEditor
