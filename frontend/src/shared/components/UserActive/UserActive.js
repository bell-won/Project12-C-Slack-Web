import React from 'react'
import styled from 'styled-components'
import { COLOR } from '../../constant/style'

function UserActive({ isActive, customStyle }) {
  return <UserActiveCircle isActive={isActive} {...customStyle} />
}

const UserActiveCircle = styled.div`
  width: 8px;
  height: 8px;
  background: ${({ isActive }) => (isActive ? COLOR.USER_ACTIVE : 'white')};
  border: 1px solid black;
  border-radius: 5px;
  position: ${({ position }) => position};
  right: ${({ right }) => right};
  bottom: ${bottom => bottom};
`

export default UserActive
