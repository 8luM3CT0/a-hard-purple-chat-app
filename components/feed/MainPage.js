import styled from 'styled-components'
import { Avatar, IconButton } from '@material-ui/core'
import {
  Add,
  AttachFile,
  EmojiEmotions,
  GroupAddOutlined,
  Phone,
  Send,
  StarBorder,
  Translate,
  Videocam
} from '@material-ui/icons'
//for messages sending
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection } from 'react-firebase-hooks/firestore'
import { auth, db } from '../../firebase'
import { useRef, useState } from 'react'
import getReceiver from '../../utilities/getReceiver'
import firebase from 'firebase'
import TimeAgo from 'timeago-react'
import { useRouter } from 'next/router'
import MessageContainer from './MessageContainer'

function MainPage ({ chat, messages }) {
  const [user] = useAuthState(auth)
  const [input, setInput] = useState('')
  const endOfChatRef = useRef(null)
  const router = useRouter()
  const [receiverSnapshot] = useCollection(
    db.collection('users').where('email', '==', getReceiver(chat.users, user))
  )
  const [messageSnapshot] = useCollection(
    db
      .collection('chats')
      .doc(router.query.id)
      .collection('messages')
      .orderBy('timestamp', 'asc')
  )

  //scroll to the bottom of the chat
  const scrollToEnd = () => {
    endOfChatRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  }

  //sends message
  const sendWords = e => {
    e.preventDefault()

    db.collection('users')
      .doc(user.uid)
      .set(
        {
          lastSeen: firebase.firestore.FieldValue.serverTimestamp()
        },
        { merge: true }
      )
    db.collection('chats')
      .doc(router.query.id)
      .collection('messages')
      .add({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        message: input,
        user: user.email,
        user: user.displayName,
        photoURL: user.photoURL
      })
    setInput('')
    scrollToEnd()
  }

  //show the messages
  const showChatFeed = () => {
    if (messageSnapshot) {
      return messageSnapshot.docs.map(message => (
        <MessageContainer
          key={message.id}
          user={message.data().user}
          message={{
            ...message.data(),
            timestamp: message
              .data()
              .timestamp?.toDate()
              .getTime()
          }}
        />
      ))
    } else {
      return JSON.parse(messages).map(message => (
        <MessageContainer
          key={message.id}
          user={message.user}
          message={message}
        />
      ))
    }
  }
  const receiver = receiverSnapshot?.docs?.[0]?.data()
  const receiverEmail = getReceiver(chat.users, user)

  return (
    <Container>
      {/** FeedTop*/}
      <FeedTop>
        {/**FeedDetails */}
        <TopDetails>
          <FeedDetails>
            {/**UserPic */}
            {receiver ? (
              <UserPic src={receiver?.photoURL} />
            ) : (
              <UserPic src={receiverEmail[0]} />
            )}
            {/**Name */}
            <Name>{receiver?.displayName}</Name>
            <Favorite />
          </FeedDetails>
          {/**FeedIcons */}
          <FeedIcons>
            {/**IconBtn */}
            <IconBtn>
              <Videocam />
            </IconBtn>
            {/**IconBtn */}
            <IconBtn>
              <Phone />
            </IconBtn>
            {/**IconBtn */}
            <BtnSecondary>
              <AddGroup />
            </BtnSecondary>
          </FeedIcons>
        </TopDetails>
        <ChatOptions>
          <H4Active>Conversation</H4Active>
          <h4>Files</h4>
          <h4>Notes</h4>
          <h4>Organization</h4>
          <h4>Activity</h4>
          <AddBtn />
        </ChatOptions>
      </FeedTop>
      {/**FeedChat */}
      <FeedChat>
        {/**showMessages */}
        {showChatFeed()}
        {/**endOfMessages */}
        <ChatFeedBottom ref={endOfChatRef} />
      </FeedChat>
      {/**ChatInput */}
      <ChatInput>
        {/**InputBox */}
        <InputBox>
          {/**Icon with border */}
          <TranslateIcon />
          {/**InputChat */}
          <InputBit
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder='Type  new message'
          />
          <button hidden disabled={!input} type='submit' onClick={sendWords}>
            send
          </button>
          {/**IconBtn */}
          <InputBtn disabled={!input} type='submit' onClick={sendWords}>
            <Send />
          </InputBtn>
          {/**Icon */}
          <InputBtn>
            <EmojiEmotions />
          </InputBtn>
          {/**Icon */}
          <InputBtn>
            <AttachFile />
          </InputBtn>
        </InputBox>
      </ChatInput>
    </Container>
  )
}

export default MainPage

const Container = styled.div``

const FeedTop = styled.div`
  position: sticky;
  z-index: 100;
  top: 0;
  display: flex;
  background-color: #f3f3fd;
  flex-direction: column;
  padding: 10px;
  border-bottom: 3px solid #eaeafdcc;
`
const TopDetails = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
  margin-bottom: 20px;
`

const FeedDetails = styled.div`
  display: flex;
  padding: 10px 20px 10px 30px;
  align-items: center;
`

const UserPic = styled(Avatar)`
  :hover {
    opacity: 0.9;
  }
`

const Name = styled.h3`
  font-weight: 500;
  font-size: 20px;
  color: #414141;
  margin-left: 20px;
  margin-right: 20px;
`

const Favorite = styled(StarBorder)`
  color: #5d4b6df6;
`

const FeedIcons = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
`
const IconBtn = styled(IconButton)`
  &&& {
    background-color: #4c5399;
    color: white;
    height: 40px;
    width: 40px;
    margin-left: 10px;
  }
`

const BtnSecondary = styled(IconButton)`
  &&& {
    background-color: transparent;
    height: 40px;
    width: 40px;
    border-radius: 999px;
    border: 1px solid lightgray;
    color: gray;
    margin: 0 10px 0 10px;
  }
`

const AddGroup = styled(GroupAddOutlined)``

const ChatOptions = styled.div`
  display: flex;
  align-items: center;
  padding-left: 20px;
  > h4 {
    font-weight: 500;
    cursor: pointer;
    color: gray;
    margin: 0 20px 0 20px;
  }
`

const H4Active = styled.h4`
  &&& {
    margin: 0 20px 0 20px;
    color: #4c5399;
    border-bottom: 3px solid #4c5399;
    padding-bottom: 5px;
  }
`
const AddBtn = styled(Add)`
  &&& {
    color: gray;
    cursor: pointer;
  }
`

const FeedChat = styled.div`
  min-height: 90vh;
  padding: 30px;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`
const ChatFeedBottom = styled.div`
  margin-bottom: 60px;
`

const ChatInput = styled.form`
  display: flex;
  align-items: center;
  padding: 10px;
  position: sticky;
  bottom: 0;
  background-color: #f3f3fd;
  z-index: 100;
`

const InputBox = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  height: 60px;
  background-color: white;
`
const TranslateIcon = styled(Translate)`
  &&& {
    color: darkgray;
    height: 30px;
    width: 30px;
    border-right: 1px solid lightgray;
    padding-right: 10px;
    margin-left: 10px;
    :hover {
      cursor: pointer;
    }
  }
`
const InputBit = styled.input`
  flex: 1;
  outline: 0;
  border: 0;
  background-color: transparent;
  padding-left: 10px;
`

const InputBtn = styled(IconButton)`
  &&& {
    color: darkgray;
    background-color: transparent;
    height: 30px;
    width: 30px;
    margin: 0 10px 0 10px;
  }
`
