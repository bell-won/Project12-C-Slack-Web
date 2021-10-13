import React from 'react'
import styled from 'styled-components'
import { throttle } from '../../utils'
import { draggableLine } from '../../utils/draggableLine'

function DraggableBoundaryLine({ setWidth, reverse, min, max, color }) {
  return (
    <DraggableBoundaryLineStyle
      color={color}
      draggable="true"
      onDrag={throttle(draggableLine(setWidth, reverse, min, max), 50)}
    />
  )
}

const DraggableBoundaryLineStyle = styled.div`
  opacity: 0;
  width: 4px;
  height: 100%;
  cursor: col-resize;
  margin: 0 -2px;
  &:hover {
    background: black;
    opacity: 100;
    position: relative;
    ::after {
      content: ' ';
      position: absolute;
      display: block;
      width: 4px;
      height: 100%;
      left: 0;
      top: 0;
      background-color: ${({ color }) => {
        return color ? color : 'white'
      }};
    }
  }

  &:active {
    opacity: 0;
  }
`

export default DraggableBoundaryLine
