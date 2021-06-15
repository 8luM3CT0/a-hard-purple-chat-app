import styled from 'styled-components'

function Welcome () {
  return (
    <WelcomePage>
      <WelcomeGreeting>
        <h1>Hello there!</h1>
        <h2>To start, click on the icon and add a user</h2>
        <h2>Or if you have already added the user, tap on the chatbar</h2>
      </WelcomeGreeting>
    </WelcomePage>
  )
}

export default Welcome

const WelcomePage = styled.div`
  height: 100vh;
  display: grid;
  flex: 1;
  place-items: center;
  background-color: whitesmoke;
`

const WelcomeGreeting = styled.div`
  padding: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  > h1 {
    font-weight: 600;
    color: gray;
  }
  > h2 {
    font-weight: 500;
    color: darkgray;
    margin: 15px;
  }
`
