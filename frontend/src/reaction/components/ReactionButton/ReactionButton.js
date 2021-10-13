import React from 'react'
import styled from 'styled-components'

import { COLOR } from '../../../shared/constant/style'

import Button, { whiteButtonStyle } from '../../../shared/components/Button'

function ReactionButton({ reaction, updateReactionHandler }) {
  return (
    <Button
      onClick={() => updateReactionHandler(reaction.emoji)}
      customStyle={createReactionStyle(reaction.set)}
    >
      <EmotionArea>{reaction.emoji}</EmotionArea>
      <UserNumArea>{reaction.users.length}</UserNumArea>
    </Button>
  )
}
const createReactionStyle = isMyReaction => ({
  ...reactionButtonStyle,
  border: `1px solid ${
    isMyReaction ? COLOR.REACTION_MINE_TEXT_AND_LINE : 'gray'
  }`,
  color: isMyReaction ? COLOR.REACTION_MINE_TEXT_AND_LINE : 'black',
  backgroundColor: isMyReaction
    ? COLOR.BACKGROUND_REACTION_MINE
    : COLOR.HOVER_GRAY,
})

const reactionButtonStyle = {
  ...whiteButtonStyle,
  boxSizing: 'border-box',
  width: '50px',
  height: '25px',
  padding: '0 7px',
  display: 'flex',
  justifyContent: 'space-around',
  borderRadius: '20px',
  cursor: 'pointer',
  alignItems: 'center',
  fontWeight: 'inherit',
}

const EmotionArea = styled.div`
  display: flex;
  line-height: 20px;
  flex-direction: row;
  align-items: center;
`

const UserNumArea = styled.div`
  margin-left: 5px;
  line-height: 20px;
  font-size: 13px;
  display: flex;
  flex-direction: row;
  align-items: center;
`

export default ReactionButton
