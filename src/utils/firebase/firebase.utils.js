import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDgLJLXB-Zgbix4eUl-hvSeAjKZckBh2A0",
  authDomain: "crwn-clothing-db-67ea5.firebaseapp.com",
  projectId: "crwn-clothing-db-67ea5",
  storageBucket: "crwn-clothing-db-67ea5.appspot.com",
  messagingSenderId: "116890441641",
  appId: "1:116890441641:web:802c4420bf1b540b1096b8"
};

const firebaseApp = initializeApp(firebaseConfig);
 
const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: 'select_account'
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
          displayName,
          email,
          createdAt,
        });
      } catch (error) {
        console.error('error creating user', error.message);
    }
  }

  return userDocRef;
}
