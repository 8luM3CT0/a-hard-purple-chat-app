import firebase from 'firebase'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBT0_XhJa4l9pt6gy0Q-8FMlspLk4Z8OoQ',
  authDomain: 'purple-chat-2021.firebaseapp.com',
  projectId: 'purple-chat-2021',
  storageBucket: 'purple-chat-2021.appspot.com',
  messagingSenderId: '423242470547',
  appId: '1:423242470547:web:0daff8733a21a8923fe966',
  measurementId: 'G-2NDLBJ355S'
}

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app()

const db = app.firestore()
const auth = app.auth()
const provider = new firebase.auth.GoogleAuthProvider()

export { db, auth, provider }
