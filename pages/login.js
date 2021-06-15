import Head from 'next/head'
import styled from 'styled-components'
import { Button } from '@material-ui/core'
import { auth, provider } from '../firebase'

function Login () {
  const signIn = () => {
    auth.signInWithPopup(provider).catch(alert)
  }

  return (
    <LoginContainer>
      <LoginBox>
        <Head>
          <title>Login page</title>
        </Head>
        {/**Logo */}
        <Logo src='https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Microsoft_logo_%282012%29.svg/1280px-Microsoft_logo_%282012%29.svg.png' />
        <h2>Sign in with Microsoft</h2>
        <h4>Sign in to continue with the app</h4>
        <LoginBtn onClick={signIn}>
          <h3>Sign in</h3>
        </LoginBtn>
      </LoginBox>
    </LoginContainer>
  )
}

export default Login

const LoginContainer = styled.div`
  display: grid;
  background-image: url('https://wallpaperaccess.com/full/921230.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  place-items: center;
  height: 100vh;
`

const LoginBox = styled.div`
  display: flex;
  background-color: #ffffffd6;
  flex-direction: column;
  padding: 100px 180px;
  border-radius: 13px;
  align-items: center;
  > h2 {
    font-weight: 500;
    margin-top: 20px;
    margin-bottom: 10px;
  }
  > h4 {
    font-weight: 400;
    color: darkgray;
  }
`

const Logo = styled.img`
  height: 60px;
  width: 300px;
  margin-bottom: 30px;
`

const LoginBtn = styled(Button)`
  &&& {
    align-self: center;
    background-color: #00a2ed;
    border-radius: 15px;
    padding-top: 2px;
    padding-bottom: 2px;
    padding-right: 50px;
    padding-left: 50px;
    color: white;
    margin-top: 25px;
    text-transform: capitalize;
  }
`
