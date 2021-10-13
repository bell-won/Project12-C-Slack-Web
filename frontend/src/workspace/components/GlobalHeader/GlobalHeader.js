import React, { useRef } from 'react'
import { useHistory } from 'react-router'
import styled from 'styled-components'

import { COLOR } from '../../../shared/constant/style'
import { signOut } from '../../../api/user'

import Button, { whiteButtonStyle } from '../../../shared/components/Button'

function GlobalHeader() {
  const history = useHistory()
  const isSignout = useRef(false)

  const signOutHandle = async () => {
    if (!isSignout.current) {
      isSignout.current = true
      await signOut()
      history.push('/login')
    }
  }

  return (
    <StyledDiv>
      <ButtonDiv>
        <Button customStyle={whiteButtonStyle} onClick={signOutHandle}>
          Sign out
        </Button>
      </ButtonDiv>
    </StyledDiv>
  )
}

export default GlobalHeader

const StyledDiv = styled.div`
  width: 100%;
  height: 40px;
  background: ${COLOR.GLOBAL_HEADER_BACKGROUND};
`

const ButtonDiv = styled.div`
  float: right;
  margin-right: 20px;
`
