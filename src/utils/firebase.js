import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "id311-run-and-share.firebaseapp.com",
    projectId: "id311-run-and-share",
    storageBucket: "id311-run-and-share.appspot.com",
    messagingSenderId: import.meta.env.VITE_FIREBASE_MSG_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
  };

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();

export const db = firebase.firestore();