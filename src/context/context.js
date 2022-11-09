import React, { createContext, useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { setDoc, doc } from 'firebase/firestore';
import formatDate from '../utils/formatDate';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { auth } from '../firebase/firebase';
import { FacebookAuthProvider } from 'firebase/auth';

export const ExpenseProvider = ({ children }) => {
  // * state for user.
  const [userReal, setUserReal] = useState('');

  // * Initial State.
  const [newinitialState, setNewInitialState] = useState([
    {
      id: '',
      amount: 0,
      type: 'Income',
      category: '',
      date: formatDate(new Date()),
    },
  ]);

  // * want to call this function only when first page loads hence no dependencies in useEffect.
  useEffect(() => {
    const unsub = auth.onAuthStateChanged(user1 => {
      setUserReal(user1);
      console.log(user1);
      getData(user1.displayName);
    });
    return () => unsub;
  }, []);

  // * function for getting user data from firebase database.
  const getData = username => {
    getDocs(collection(db, 'Expenses', username, username.slice(0, 3))).then(
      data => setNewInitialState(data.docs.map(item => item.data()))
      // console.log(data.docs.map(item => item.data()))
    );
  };

  // * google authentication provider library.
  const provider = new GoogleAuthProvider();

  // * facebook authentication provider.
  const providerFb = new FacebookAuthProvider();

  const authentication = getAuth();

  // * Firebase function for logging with google oauth.
  function LoginUsingGoogle() {
    signInWithPopup(authentication, provider)
      .then(res => {
        // const credential = GoogleAuthProvider.credentialFromResult(res);
        // const token = credential.accessToken;
        // const user = res.user;
        // console.log({ user, token, credential });
      })
      .catch(error => {
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // const email = error.customData.email;
        // const credential = GoogleAuthProvider.credentialFromError(error);
        // console.log(errorCode, errorMessage, email, credential);
      });

    // * Creates a new collection as soon as a new user is detected.
    createNewCollection();
  }

  // * Firebase function for logging with facebook oauth.
  function LoginUsingFacebook() {
    signInWithPopup(authentication, providerFb)
      .then(result => {
        // The signed-in user info.
        const user = result.user;

        console.log(user);

        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;

        // ...
      })
      .catch(error => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = FacebookAuthProvider.credentialFromError(error);

        // ...
      });

    // * Creates a new collection as soon as a new user is detected.
    // createNewCollection();
  }

  // * function for signing out of google.
  function signOutGoogle() {
    signOut(authentication)
      .then(res => console.log('SignOut Successful', res))
      .catch(error => console.log('Signout Failed', error));
  }

  // * function for creating new collection.
  function createNewCollection() {
    setDoc(doc(collection(db, 'Expenses'), userReal), {
      new: true,
    });
  }

  // ! Debugging
  // console.log(newinitialState);
  // console.log(newinitialState);
  // console.log(state);

  return (
    <ExpenseTrackerContext.Provider
      value={{
        newinitialState,
        getData,
        LoginUsingGoogle,
        signOutGoogle,
        createNewCollection,
        LoginUsingFacebook,
      }}
    >
      {children}
    </ExpenseTrackerContext.Provider>
  );
};

export const ExpenseTrackerContext = createContext();
