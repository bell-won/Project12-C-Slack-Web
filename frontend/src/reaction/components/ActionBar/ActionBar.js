import React from 'react'
import { useSetRecoilState } from 'recoil'
import { useParams, Link } from 'react-router-dom'
import styled from 'styled-components'

import { COLOR } from '../../../shared/constant/style'
import { SMILE, COMMENTDOTS, ELLIPSISV } from '../../../shared/constant/icon'
import calcEmojiModalLocation from '../../utils/calculateEmojiModalLocation'
import { modalRecoil } from '../../../store'

import Icon from '../../../shared/components/Icon'
import EmojiModal from '../EmojiModal'

function ActionBar({ setOpenModal, updateReactionHandler, type, chatId }) {
  const setModal = useSetRecoilState(modalRecoil)
  const { workspaceId, channelId } = useParams()

  const closeHandler = () => {
    setOpenModal(false)
    setModal(null)
  }

  const openEmojiModal = e => {
    const [axisX, axisY] = calcEmojiModalLocation(e)

    setOpenModal(true)
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
    <ActionBarStyle>
      {type !== 'reply' && (
        <>
          <DefaultReactionBtn onClick={() => updateReactionHandler('👍')}>
            👍
          </DefaultReactionBtn>
          <DefaultReactionBtn onClick={() => updateReactionHandler('👏')}>
            👏
          </DefaultReactionBtn>
          <DefaultReactionBtn onClick={() => updateReactionHandler('😄')}>
            😄
          </DefaultReactionBtn>
        </>
      )}
      <DefaultReactionBtn onClick={openEmojiModal}>
        <Icon icon={SMILE} customStyle={customIconStyle} />
      </DefaultReactionBtn>
      {type !== 'reply' && (
        <Link to={`/workspace/${workspaceId}/${channelId}/${chatId}`}>
          <DefaultReactionBtn>
            <Icon icon={COMMENTDOTS} customStyle={customIconStyle} />
          </DefaultReactionBtn>
        </Link>
      )}
      <DefaultReactionBtn>
        <Icon icon={ELLIPSISV} customStyle={customIconStyle} />
      </DefaultReactionBtn>
    </ActionBarStyle>
  )
}
const customIconStyle = {
  color: COLOR.LABEL_DEFAULT_TEXT,
}
const ActionBarStyle = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  background-color: ${COLOR.BACKGROUNT_MODAL_GRAY};
  box-shadow: 0px 0px 10px -2px grey;
  border-radius: 5px;
  overflow: hidden;
`

const DefaultReactionBtn = styled.div`
  width: 30px;
  height: 30px;
  line-height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background: rgba(100, 100, 100, 0.1);
  }
`

export default ActionBar
