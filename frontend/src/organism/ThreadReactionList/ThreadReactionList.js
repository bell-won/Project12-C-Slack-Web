import React from 'react'
import styled, { css } from 'styled-components'
import ThreadReactionCard from '../../atom/ThreadReactionCard'

function ThreadReactionList({ reactions }) {
  const renderReactionCard = reactions.map((reaction, idx) => {
    return <ThreadReactionCard key={idx} {...reaction} />
  })

  return <ThreadReactionListStyle>{renderReactionCard}</ThreadReactionListStyle>
}

const ThreadReactionListStyle = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 0 10px;
  border-radius: 5px;
`

export default ThreadReactionList
