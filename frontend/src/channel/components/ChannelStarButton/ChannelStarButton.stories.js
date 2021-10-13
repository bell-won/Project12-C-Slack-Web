import React from 'react'

import ChannelStarButton from './ChannelStarButton'
import { MemoryRouter, Route } from 'react-router-dom'

export default {
  title: 'Channel/ChannelStarButton',
  component: ChannelStarButton,
}
const Template = args => (
  <MemoryRouter
    initialEntries={[
      'workspace/5fc4fe2faa1ecd6a71dde1a8/5fc4fe66f303676bad052ea0',
    ]}
  >
    <Route path="workspace/:workspaceId/:channelId">
      <ChannelStarButton {...args} />
    </Route>
  </MemoryRouter>
)

export const hasSection = Template.bind({})
hasSection.args = {
  section: { name: 'sectionName' },
  channel: { sectionName: 'sectionName' },
}
export const nullsection = Template.bind({})
nullsection.args = {
  section: { name: null },
  channel: { sectionName: '' },
}
