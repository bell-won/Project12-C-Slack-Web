import React, { useState } from 'react'
import { useHistory, useParams } from 'react-router'
import { toast } from 'react-toastify'
import { useRecoilValue } from 'recoil'

import request from '../../../shared/utils/request'
import { COLOR } from '../../../shared/constant/style'
import { useRefreshChannels, workspaceQuery } from '../../../store'
import { STAR, COLOREDSTAR } from '../../../shared/constant/icon'
import { isEmpty } from '../../../shared/utils'

import Icon from '../../../shared/components/Icon'

function ChannelStarButton({
  channel: {
    sectionName,
    channelId: { _id: channelId },
  },
}) {
  const [sectionInfo, setSectionInfo] = useState(sectionName)
  const { workspaceId } = useParams()
  const refreshChannels = useRefreshChannels(workspaceId)
  const { _id: workspaceUserInfoId } = useRecoilValue(
    workspaceQuery(workspaceId),
  )
  const history = useHistory()

  const updateSection = async () => {
    try {
      let currentSectionName = null
      if (isEmpty(sectionInfo)) currentSectionName = 'Starred'

      const { data } = await request.PATCH('/api/channel/section', {
        workspaceUserInfoId,
        channelId,
        sectionName: currentSectionName,
      })

      if (data.success) setSectionInfo(currentSectionName)
      refreshChannels()
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
