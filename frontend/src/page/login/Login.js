import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import QueryString from 'qs'
import styled from 'styled-components'

import { GITHUB } from '../../shared/constant/icon'
import { COLOR } from '../../shared/constant/style'
import { isEmpty } from '../../shared/utils'

import Icon from '../../shared/components/Icon'
import Image from '../../shared/components/Image'
import Description from '../../shared/components/Description'
import Button from '../../shared/components/Button'

const baseURL =
  process.env.NODE_ENV === 'development'
    ? process.env.REACT_APP_DEV_API_URL
    : process.env.REACT_APP_API_URL

const LoginPage = props => {
  const history = useHistory()
  const query = QueryString.parse(props.location.search, {
    ignoreQueryPrefix: true,
  })
  useEffect(() => {
    if (!isEmpty(query.invitecode)) {
      localStorage.setItem('invitecode', query.invitecode)
    }
  }, [])

  const gohomeHandle = () => {
    history.push('/')
  }
  return (
    <>
      <LoginHeader>
        <Image
          alt="Slack"
          src="favicon.ico"
          title="Slack"
          customStyle={customImageStyle}
          onClick={gohomeHandle}
        />
      </LoginHeader>
      <CenterDiv>
        <Description customStyle={customDescriptionStyle}>
          Slack에 로그인
        </Description>
        <Description>사용하려는 github 계정으로 계속해 주세요.</Description>
        <LoginDiv>
          <form method="GET" action={`${baseURL}/api/user/sign-in/github`}>
            <Button customStyle={customButtonStyle}>
              <Icon icon={GITHUB} customStyle={customIconStyle} />
              Login With github
            </Button>
          </form>
        </LoginDiv>
      </CenterDiv>
    </>
  )
}
const customIconStyle = {
  fontSize: '1.6rem',
  padding: '0 10px 0 0',
}
const customDescriptionStyle = {
  fontSize: '36px',
  fontWeight: 700,
}
const customImageStyle = {
  height: '34px',
}
const customButtonStyle = {
  display: 'flex',
  width: '20rem',
  color: 'black',
  height: '2.5rem',
  border: '1px solid #1da1f2',
  borderRadius: '4px',
  backgroundColor: 'white',
  justifyContent: 'center',
  alignItems: 'center',
  fontWeight: 'initial',
  hoverBackgroundColor: COLOR.HOVER_GRAY,
  activeBackgroundColor: COLOR.ACTIVE_GRAY,
}
const LoginHeader = styled.header`
  display: flex;
  flex-direction: column;
  padding: 48px 0 40px;
  width: 100%;
  align-items: center;
`

const CenterDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`

const LoginDiv = styled.div`
  margin: 70px 0px;
`

export default LoginPage
