import React, { useEffect, useState } from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import MainComp from './Components/MainComp';
import '../src/App.css';
import { ExpenseProvider } from './context/context';
import LoginPage from './Components/LoginPage';
import { auth } from './firebase/firebase';

function App() {
  const [mainUser, setMainUser] = useState('');

  // * getting user data from firebase
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setMainUser(user);
      } else {
        setMainUser('');
      }
    });

    return unsubscribe;
  }, [mainUser]);

  return (
    <ExpenseProvider>
      <ChakraProvider theme={theme}>
        {mainUser ? <MainComp /> : <LoginPage />}
        {/* <MainComp /> */}
      </ChakraProvider>
    </ExpenseProvider>
  );
}

export default App;
