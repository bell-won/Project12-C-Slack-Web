import React, { memo } from 'react'
import styled from 'styled-components'
import { convertFromRaw, Editor, EditorState } from 'draft-js'
import { COLOR } from '../../constant/style'

const ChatContent = memo(
  ({ displayName, createdAt, contents, handleProfileModal, fileContents }) => {
    return (
      <StyledChatContent>
        <ChatHeader>
          <StyledUserName onClick={handleProfileModal}>
            {displayName}
          </StyledUserName>
          <StyledDate>{createdAt}</StyledDate>
        </ChatHeader>
        <ChatContentArea>
          <Editor
            editorState={EditorState.createWithContent(
              convertFromRaw(JSON.parse(contents)),
            )}
            readOnly={true}
          />
          {fileContents}
        </ChatContentArea>
      </StyledChatContent>
    )
  },
)
const StyledChatContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  margin-left: 15px;
`
const ChatHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`

const StyledDate = styled.span`
  color: ${COLOR.GRAY};
  font-size: 12px;
`
const StyledUserName = styled.div`
  display: inline-block;
  font-size: 15px;
  line-height: 1.46668;
  font-weight: 900;
  word-break: break-word;
  margin-right: 5px;
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`

const ChatContentArea = styled.div`
  word-break: break-all;
`
export default ChatContent
