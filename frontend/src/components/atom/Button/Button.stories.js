import React from 'react'
import Button, { whiteButtonStyle } from './Button'
import Icon from '../Icon'
import { CLOSE } from '../../../constant/icon'
import { COLOR } from '../../../constant/style'

export default {
  title: 'Atom/Button',
  component: Button,
}

const Template = args => <Button {...args} />

export const Default = Template.bind({})
Default.args = {
  children: 'Default',
}

export const WhiteButton = Template.bind({})
WhiteButton.args = {
  children: 'white',
  customStyle: whiteButtonStyle,
}

export const IconButton = Template.bind({})
IconButton.args = {
  children: <Icon icon={CLOSE} size="10px" color={COLOR.RED} />,
}
