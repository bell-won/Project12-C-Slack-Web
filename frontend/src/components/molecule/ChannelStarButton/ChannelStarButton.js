import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router'
import { toast } from 'react-toastify'
import { useRecoilValue } from 'recoil'

import Icon from '../../atom/Icon'
import request from '../../../util/request'
import { COLOR } from '../../../constant/style'
import { workspaceRecoil } from '../../../store'
import { STAR, COLOREDSTAR } from '../../../constant/icon'
import { isEmpty } from '../../../util'
import useChannelList from '../../../hooks/useChannelList'

function ChannelStarButton({ channel }) {
  const section = channel.sectionName
  const { channelId } = useParams()
  const [, setChannels] = useChannelList()
  const [sectionInfo, setSectionInfo] = useState(section)
  const workspaceUserInfo = useRecoilValue(workspaceRecoil)

  const history = useHistory()

  useEffect(() => {
    setSectionInfo(channel.sectionName)
  }, [channel])

  const updateSection = async () => {
    try {
      let sectionName = null
      if (isEmpty(sectionInfo)) sectionName = 'Starred'

      const { data } = await request.PATCH('/api/channel/section', {
        workspaceUserInfoId: workspaceUserInfo._id,
        channelId,
        sectionName,
      })
      if (data.success) {
        setSectionInfo(sectionName)
      }

      //채널 목록 재요청
      setChannels()
    } catch (err) {
      toast.error('채널 섹션 정보를 가져오는데 오류가 발생했습니다.', {
        onClose: () => history.goBack(),
      })
    }
  }

  return !isEmpty(sectionInfo) ? (
    <Icon
      icon={COLOREDSTAR}
      customStyle={customIconStyle}
      onClick={updateSection}
    />
  ) : (
    <Icon icon={STAR} customStyle={customIconStyle} onClick={updateSection} />
  )
}
const customIconStyle = {
  color: COLOR.STARBLUE,
  fontSize: '12px',
  margin: '5px',
  cursor: 'pointer',
}

export default ChannelStarButton
