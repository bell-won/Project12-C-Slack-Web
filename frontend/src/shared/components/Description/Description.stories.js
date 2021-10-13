import React from 'react'
import Description from './Description'

export default {
  title: 'Atom/Description',
  component: Description,
}

const Template = args => <Description {...args} />

export const DefaultDescription = Template.bind({})
DefaultDescription.args = {
  children: 'this is description',
  margin: '0 0 28px 8px',
  fontSize: '14px',
}
