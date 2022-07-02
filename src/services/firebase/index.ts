import { initializeApp } from 'firebase/app';

// Firebase SDKs
import { getAuth } from 'firebase/auth';

import { getFirestore } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCv71b8z-JEu6BXGIukhctah7Z3RXFv60M',

  authDomain: 'eventor-69.firebaseapp.com',

  projectId: 'eventor-69',

  storageBucket: 'eventor-69.appspot.com',

  messagingSenderId: '389366363431',

  appId: '1:389366363431:web:c2d255790346ac37826502',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// SDKs init
export const auth = getAuth(app);

export const db = getFirestore(app);
