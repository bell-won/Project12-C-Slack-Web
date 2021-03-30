import React, { useEffect, useState } from 'react'
import Description from '../../atom/Description'
import MyWorkspace from '../../molecule/WorkspaceCard'
import request from '../../../util/request'

const MyWorkspaceSection = () => {
  const [workspaceData, setWorkspaceData] = useState([])
  useEffect(() => {
    ;(async () => {
      const { data } = await request.GET('/api/workspace')
      setWorkspaceData(data.data)
    })()
  }, [])

  return (
    <section>
      <Description customStyle={customDescriptionStyle}>
        내 워크스페이스
      </Description>
      {workspaceData.map((data, index) => (
        <MyWorkspace
          key={'MyWorkspace' + index}
          workspaceName={data.name}
          path={`/workspace/${data._id}/${data.default_channel}`}
        />
      ))}
    </section>
  )
}
const customDescriptionStyle = {
  fontWeight: 700,
  fontSize: '36px',
}
export default MyWorkspaceSection
