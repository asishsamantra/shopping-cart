import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const config = {
  apiKey: 'AIzaSyAG9BNPYaQLPRoMSmJr3DWhmI1zYWyhLaE',
  authDomain: 'auth-development-ff6c6.firebaseapp.com',
  projectId: 'auth-development-ff6c6',
  storageBucket: 'auth-development-ff6c6.appspot.com',
  messagingSenderId: '950774278001',
  appId: '1:950774278001:web:ea87c08f98d9633eae38d0',
  measurementId: 'G-NXGGQ2ZB3E',
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
