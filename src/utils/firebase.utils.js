import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithRedirect, 
  signInWithPopup, 
  GoogleAuthProvider 
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc
} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBqVmzc6IYQEt0XvqvYVRnXVfqDQVyDcz0",
    authDomain: "crwn-clothing-db-16ac6.firebaseapp.com",
    projectId: "crwn-clothing-db-16ac6",
    storageBucket: "crwn-clothing-db-16ac6.appspot.com",
    messagingSenderId: "672463558131",
    appId: "1:672463558131:web:0fb41c42fe9ea723f9ae86",
    measurementId: "G-KTF6CZ6MP6"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();

  provider.setCustomParameters({
    prompt: "select_account"
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
  
  export const db = getFirestore();

  export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);

    if(!userSnapshot.exists()) {
      const {displayName, email} = userAuth;
      const createdAt = new Date();

      try {
        await setDoc(userDocRef, {
          displayName,
          email,
          createdAt
        });
      } 
      catch (error) {
        console.log("Error creating user ", error.message);
      }
    }
  }