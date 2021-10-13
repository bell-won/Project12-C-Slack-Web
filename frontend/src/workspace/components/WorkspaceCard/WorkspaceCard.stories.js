import React from 'react'
import WorkspaceCard from './WorkspaceCard'

export default {
  title: 'Organism/MyWorkspace',
  component: WorkspaceCard,
}

const Template = args => <WorkspaceCard {...args} />

export const defaultWorkspaceCard = Template.bind({})
defaultWorkspaceCard.args = {
  workspaceName: '첫번째 워크스페이스',
}
