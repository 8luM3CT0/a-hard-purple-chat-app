import '../styles/globals.css'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../firebase'
import firebase from 'firebase'
import { useEffect } from 'react'
//components
import Login from './login'
import Loading from '../components/loading/Loading'

function MyApp ({ Component, pageProps }) {
  const [user, loading] = useAuthState(auth)

  useEffect(() => {
    if (user) {
      db.collection('users')
        .doc(user.uid)
        .set(
          {
            email: user.email,
            lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
            photoURL: user.photoURL,
            displayName: user.displayName
          },
          {
            merge: true
          }
        )
    }
  }, [user])

  if (!user) return <Login />
  if (loading) return <Loading />
  return <Component {...pageProps} />
}

export default MyApp
