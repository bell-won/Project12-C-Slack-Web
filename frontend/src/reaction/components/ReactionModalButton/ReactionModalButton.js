import React from 'react'
import { useSetRecoilState } from 'recoil'

import { modalRecoil } from '../../../store'
import calcEmojiModalLocation from '../../utils/calculateEmojiModalLocation'
import { PLUS, SMILE } from '../../../shared/constant/icon'

import EmojiModal from '../EmojiModal'
import Button, { whiteButtonStyle } from '../../../shared/components/Button'
import Icon from '../../../shared/components/Icon'

function ReactionModalButton({ updateReactionHandler }) {
  const setModal = useSetRecoilState(modalRecoil)

  const closeHandler = () => setModal(null)

  const openEmojiModal = e => {
    const [axisX, axisY] = calcEmojiModalLocation(e)

    setModal(
      <EmojiModal
        sendHandler={updateReactionHandler}
        closeHandler={closeHandler}
        axisX={axisX}
        axisY={axisY}
      />,
    )
  }

  return (
    <Button customStyle={customStyle} onClick={openEmojiModal}>
      <Icon icon={SMILE} customStyle={smileIconStyle} />
      <Icon icon={PLUS} customStyle={plustIconStyle} />
    </Button>
  )
}
const smileIconStyle = { fontSize: '17px' }
const plustIconStyle = { fontSize: '8px' }
const customStyle = {
  ...whiteButtonStyle,
  height: '25px',
  border: '1px solid gray',
  borderRadius: '20px',
  display: 'flex',
}

export default ReactionModalButton
