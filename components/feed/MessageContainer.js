import styled from 'styled-components'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../firebase'
import moment from 'moment'

function MessageContainer ({ user, message }) {
  const [userLoggedIn] = useAuthState(auth)

  const Type = user === userLoggedIn.email ? Sender : Receiver

  return (
    <Container>
      <Type
        style={{
          display: 'grid',
          justifyContent: 'space-between',
          width: '400px',
          alignItems: 'center'
        }}
      >
        <UserName>
          <h4>{user}</h4>
        </UserName>
        <MessageDetails>
          <TheMessage>{message.message}</TheMessage>
          <Timestamp>
            <h5>
              {message.timestamp
                ? moment(message.timestamp).format('LT')
                : '...'}
            </h5>
          </Timestamp>
        </MessageDetails>
      </Type>
    </Container>
  )
}

export default MessageContainer

const Container = styled.div``

const MessageBit = styled.p`
  width: fit-content;
  padding: 7px;
  border-radius: 13px;
  margin: 10px;
  min-width: 60px;
  padding-bottom: 26px;
  position: relative;
  font-size: 18px;
  text-align: right;
  background-color: #f0f0fffc;
  color: #313131;
`

const MessageDetails = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const TheMessage = styled.p`
  &&& {
    font-weight: 500;
    font-size: 14px;
    color: #414141;
  }
`

const UserName = styled.div`
  display: flex;
  align-items: center;
  > h4 {
    font-weight: 500;
    font-size: 16px;
    color: gray;
  }
`

const Sender = styled(MessageBit)``

const Receiver = styled(MessageBit)``

const Timestamp = styled.span`
  &&& {
    padding: 10px;
    position: absolute;
    text-align: right;
    right: 0;
    > h5 {
      font-size: 14px;
      font-weight: 600;
      color: #505ac9;
    }
  }
`
