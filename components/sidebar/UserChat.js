import { Avatar } from '@material-ui/core'
import styled from 'styled-components'
//for user actions
import getReceiver from '../../utilities/getReceiver'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../../firebase'
import { useCollection } from 'react-firebase-hooks/firestore'
import { useRouter } from 'next/router'
import TimeAgo from 'timeago-react'

function UserChat ({ id, users }) {
  const [user] = useAuthState(auth)
  const [receiverSnapshot] = useCollection(
    db.collection('users').where('email', '==', getReceiver(users, user))
  )

  const receiver = getReceiver(users, user)
  const receiverPic = receiverSnapshot?.docs?.[0]?.data()
  const router = useRouter()

  const goToUser = () => {
    router.push(`/chat/${id}`)
  }

  return (
    <Container onClick={goToUser}>
      {/**UserDetails */}
      <UserDetails>
        {/**UserPic */}
        {receiver ? (
          <UserPic src={receiverPic?.photoURL} />
        ) : (
          <UserPic>{receiver[0]}</UserPic>
        )}
        <UserName>{receiver}</UserName>
      </UserDetails>
      {/**UserDetails */}
      {receiverSnapshot ? (
        <Timestamp>
          {receiverPic?.lastSeen?.toDate() ? (
            <TimeAgo datetime={receiverPic?.lastSeen?.toDate()} />
          ) : (
            'N/A'
          )}
        </Timestamp>
      ) : (
        <Timestamp>'loading...'</Timestamp>
      )}
    </Container>
  )
}

export default UserChat

const Container = styled.div`
  display: flex;
  cursor: pointer;
  width: 360px;
  word-break: break-word;
  padding: 15px;
  justify-content: space-between;
  align-items: center;
  :hover {
    background-color: #eaebff;
    border-radius: 10px;
  }
`
const UserDetails = styled.div`
  display: flex;
  align-items: center;
`

const UserPic = styled(Avatar)`
  &&& {
    :hover {
      opacity: 0.8;
    }
  }
`

const UserName = styled.p`
  color: gray;
  font-weight: 400;
  width: 180px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-left: 10px;
`

const Timestamp = styled.p`
  color: darkgray;
  font-weight: 300;
  font-size: 12px;
`
