import React, { createContext, useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db, auth } from '../firebase/firebase';
import { setDoc, doc } from 'firebase/firestore';
import formatDate from '../utils/formatDate';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from 'firebase/auth';

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
  // logs newly added user on refresh
  useEffect(() => {
    const unsub = auth.onAuthStateChanged(user1 => {
      // updates user state with users google data
      setUserReal(user1);

      // gets data from firestore.
      getData(user1.email);
    });

    // cleanup function.
    return () => unsub;
  }, []);

  // * function for getting user data from firebase database.
  const getData = username => {
    getDocs(collection(db, 'Expenses', username, username.slice(0, 3))).then(
      data => setNewInitialState(data.docs.map(item => item.data()))
    );
  };

  // * google authentication provider library.
  const provider = new GoogleAuthProvider();

  const authentication = getAuth();

  // * Firebase function for logging with google oauth.
  function LoginUsingGoogle() {
    console.log('Loading..');
    signInWithPopup(authentication, provider);

    // * Creates a new collection as soon as a new user is detected.
    createNewCollection();
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

  return (
    <ExpenseTrackerContext.Provider
      value={{
        newinitialState,
        getData,
        LoginUsingGoogle,
        signOutGoogle,
        createNewCollection,
      }}
    >
      {children}
    </ExpenseTrackerContext.Provider>
  );
};

export const ExpenseTrackerContext = createContext();
