import React, { useRef } from 'react'
import request from '../../../shared/utils/request'
import styled from 'styled-components'
import { toast } from 'react-toastify'

import { CLIP } from '../../../shared/constant/icon'
import { isEmpty } from '../../../shared/utils'

import Button, { whiteButtonStyle } from '../../../shared/components/Button'
import Icon from '../../../shared/components/Icon'

const fileContentType = 'multipart/form-data'
const MAX_FILE_SIZE = 8192000
function FileUploader({ file, setFile }) {
  const fileInput = useRef(null)

  const handleFileInput = async () => {
    if (!fileInput.current.files[0]) return
    if (fileInput.current.files[0].size > MAX_FILE_SIZE) {
      toast.error('8MB 이하의 파일만 업로드 할 수 있습니다!')
      return
    }
    if (!isEmpty(file)) {
      await request.DELETE('/api/file', { name: file.name })
      setFile(null)
    }
    await handlePost(fileInput.current.files[0])
    fileInput.current.value = null
  }
  const handlePost = async selectedFile => {
    if (selectedFile) {
      const formData = new FormData()
      formData.append('file', selectedFile)
      const { data } = await request.POST(
        '/api/file',
        formData,
        fileContentType,
      )
      setFile(data.data)
    }
  }

  return (
    <>
      <Button
        customStyle={uploadButtonStyle}
        onClick={() => fileInput.current.click()}
      >
        <Icon icon={CLIP} />
      </Button>
      <StyeldInput
        type="file"
        name="fileData"
        ref={fileInput}
        onChange={handleFileInput}
      ></StyeldInput>
    </>
  )
}
const uploadButtonStyle = { ...whiteButtonStyle, border: 'none' }
const StyeldInput = styled.input`
  display: none;
`

export default FileUploader
