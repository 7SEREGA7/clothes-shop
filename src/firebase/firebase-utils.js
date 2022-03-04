import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const config = {
  apiKey: "AIzaSyCn9Cok9ATHPC4cjBNjNKsZKSHVsypASVE",
  authDomain: "crown-db-39fa3.firebaseapp.com",
  projectId: "crown-db-39fa3",
  storageBucket: "crown-db-39fa3.appspot.com",
  messagingSenderId: "648436362873",
  appId: "1:648436362873:web:00b0b3e4773f0ab78daea8",
  measurementId: "G-ZFDXS5E585"
}

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if(!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = userRef.get();

  if(!snapShot.exist) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch(error) {
      console.log('error during creating user ', error.message)
    }
  }

  return userRef;

}

firebase.initializeApp(config);


export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;