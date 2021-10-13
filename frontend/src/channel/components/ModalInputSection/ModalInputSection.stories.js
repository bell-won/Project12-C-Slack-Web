import React from 'react'
import ModalInputSection from './ModalInputSection'
import Input from '../Input'
import Icon from '../../../shared/components/Icon'
import { HASHTAG } from '../../../shared/constant/icon'
export default {
  title: 'Organism/Modal/ModalInputSection',
  component: ModalInputSection,
}

const Template = args => <ModalInputSection {...args} />

export const Default = Template.bind({})
Default.args = {
  name: 'Name',
  description: 'text',
  errorMessage: 'hello error message',
  children: (
    <Input>
      <Icon icon={HASHTAG} />
    </Input>
  ),
}
