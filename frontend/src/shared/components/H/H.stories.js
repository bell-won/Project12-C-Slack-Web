import React from 'react'
import H from './H'

export default {
  title: 'Atom/H',
  component: H,
}

const Template = args => <H {...args} />

export const H1 = Template.bind({})
H1.args = {
  children: 'h1 tag',
}

export const H2 = Template.bind({})
H2.args = {
  children: 'h2 tag',
  level: 2,
}
