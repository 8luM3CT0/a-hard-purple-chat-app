import { Avatar, IconButton } from '@material-ui/core'
import {
  BorderColorOutlined,
  ChatOutlined,
  EmojiObjectsOutlined,
  EventNoteOutlined,
  GroupOutlined,
  Home,
  InsertDriveFileOutlined,
  NotificationsOutlined,
  Search,
  SettingsOutlined
} from '@material-ui/icons'
import styled from 'styled-components'
//for adding users to chat
import * as EmailValid from 'email-validator'
import { auth, db } from '../../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection } from 'react-firebase-hooks/firestore'
import UserChat from './UserChat'
//for going home
import { useRouter } from 'next/router'

function Sidebar () {
  const [user] = useAuthState(auth)
  const userChatRef = db
    .collection('chats')
    .where('users', 'array-contains', user.email)
  const [chatSnapshot] = useCollection(userChatRef)
  const router = useRouter()

  const userChecker = receiver =>
    !!chatSnapshot?.docs.find(
      chat => chat.data().users.find(user => user === receiver)?.length > 0
    )

  const createChat = () => {
    const input = prompt('Add a user that exists within a certain email: ')

    if (!input) return null

    if (
      EmailValid.validate(input) &&
      !userChecker(input) &&
      input !== user.email
    ) {
      db.collection('chats').add({
        users: [user.email, input]
      })
    }
  }

  const goHome = () => {
    router.push('/')
  }

  return (
    <Container>
      {/**SidebarOptions */}
      <SidebarOptions>
        {/**OptionsTop */}
        <OptionsTop>
          {/**UserPhoto */}
          <UserPhoto src={user.photoURL} onClick={() => auth.signOut()} />
          {/**OptionsIcons */}
          <OptionsIcon>
            <NotificationsOutlined />
          </OptionsIcon>
          {/**OptionsIcons */}
          <OptionsIcon>
            <ChatOutlined />
          </OptionsIcon>
          {/**OptionsIcons */}
          <OptionsIcon>
            <GroupOutlined />
          </OptionsIcon>
          {/**OptionsIcons */}
          <OptionsIcon>
            <EventNoteOutlined />
          </OptionsIcon>
          {/**OptionsIcons */}
          <OptionsIcon>
            <InsertDriveFileOutlined />
          </OptionsIcon>
          {/**OptionsTop */}
        </OptionsTop>
        {/**OptionsBottom */}
        <OptionsBottom>
          <OptionsIcon>
            <EmojiObjectsOutlined />
          </OptionsIcon>
          <OptionsIcon>
            <SettingsOutlined />
          </OptionsIcon>
          <OptionsIcon onClick={goHome}>
            <Home />
          </OptionsIcon>
        </OptionsBottom>
        {/**OptionsBottom */}
      </SidebarOptions>
      {/**SidebarChats */}
      <SidebarChats>
        <ChatsHeader>
          {/**HeaderInput */}
          <HeaderInput>
            <input type='text' placeholder='Search' />
            <SearchIcon />
          </HeaderInput>
          {/**Icon -> Create */}
          <IconBtn>
            <BorderColorOutlined onClick={createChat} />
          </IconBtn>
        </ChatsHeader>
        {/**Chat area */}
        {/** UserChat.js*/}
        {chatSnapshot?.docs.map(chat => (
          <UserChat key={chat.id} id={chat.id} users={chat.data().users} />
        ))}
      </SidebarChats>
    </Container>
  )
}

export default Sidebar

const Container = styled.div`
  height: 100vh;
  min-width: 450px;
  max-width: 520px;
  display: flex;
  align-items: center;
`
const SidebarOptions = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  align-items: center;
  min-width: 90px;
  max-width: 130px;
  background-color: #505ac9;
`

const OptionsTop = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
`

const UserPhoto = styled(Avatar)`
  margin: 10px 0 10px 0;
  cursor: pointer;
  :hover {
    opacity: 0.9;
  }
`

const OptionsIcon = styled(IconButton)`
  &&& {
    background-color: transparent;
    color: whitesmoke;
    margin: 10px 0 10px 0;
    :hover {
      background-color: #8e95f7c1;
    }
  }
`

const OptionsBottom = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
`

const SidebarChats = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  min-width: 360px;
  max-width: 390px;
  background-color: white;
  align-items: center;
`
const ChatsHeader = styled.div`
  margin: 15px 0 20px 0;
  display: flex;
  align-items: center;
`

const HeaderInput = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  background-color: whitesmoke;
  border-radius: 10px;
  padding: 10px;
  > input {
    outline-width: 0;
    padding-right: 40px;
    flex: 1;
    border: none;
    background-color: transparent;
  }
`

const IconBtn = styled(IconButton)`
  &&& {
    color: darkgray;
    background-color: transparent;
    margin-left: 10px;
  }
`
const SearchIcon = styled(Search)`
  &&& {
    color: darkgray;
  }
`
