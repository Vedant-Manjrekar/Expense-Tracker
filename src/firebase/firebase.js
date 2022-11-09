// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDERouKMHoybjEKghP3Alm11kakp2Hs478',
  authDomain: 'expense-tracker-5e976.firebaseapp.com',
  projectId: 'expense-tracker-5e976',
  storageBucket: 'expense-tracker-5e976.appspot.com',
  messagingSenderId: '52110570432',
  appId: '1:52110570432:web:58efe9b59f89c28c430e25',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app);
