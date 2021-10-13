import React from 'react'
import Image from './Image'

export default {
  title: 'Atom/Image',
  component: Image,
}

const Template = args => <Image {...args} />

export const Logo = Template.bind({})
Logo.args = {
  src: '/logo192.png',
  alt: 'logo',
  title: 'logo',
}
