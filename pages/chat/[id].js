import Head from 'next/head'
import styled from 'styled-components'
//components
import Sidebar from '../../components/sidebar/Sidebar'
import MainPage from '../../components/feed/MainPage'
//db imports
import { db, auth } from '../../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import firebase from 'firebase'
import getReceiver from '../../utilities/getReceiver'

function Chat ({ chat, messages }) {
  const [user] = useAuthState(auth)

  return (
    <Container>
      <Head>
        <title>Chat with {getReceiver(chat.users, user)}</title>
      </Head>
      <Sidebar />
      <FeedContainer>
        <MainPage chat={chat} messages={messages} />
        {/** add these to ^ : chat={chat} messages={messages} */}
      </FeedContainer>
    </Container>
  )
}

export default Chat

export async function getServerSideProps (context) {
  const ref = db.collection('chats').doc(context.query.id)

  //For the server-side rendering of the messages
  const chatResults = await ref
    .collection('messages')
    .orderBy('timestamp', 'asc')
    .get()

  const messages = chatResults.docs
    .map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
    .map(messages => ({
      ...messages,
      timestamp: messages.timestamp.toDate().getTime()
    }))

  //for the chat rendering
  const feedResult = await ref.get()
  const chat = {
    id: feedResult.id,
    ...feedResult.data()
  }

  return {
    props: {
      messages: JSON.stringify(messages),
      chat: chat
    }
  }
}

const Container = styled.div`
  display: flex;
`

const FeedContainer = styled.div`
  flex: 1;
  background-color: #f3f3fdcc;
  height: 100vh;
  overflow: scroll;

  ::-webkit-scrollbar {
    display: none;
  }
`
