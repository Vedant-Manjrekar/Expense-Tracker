import React, { useState, useEffect } from 'react';
import { Avatar, Box, Heading } from '@chakra-ui/react';
import { auth } from '../firebase/firebase';

function Main_Heading() {
  // * state for current user name from firebase.
  const [mainUser, setMainUser] = useState('');

  // console.log(mainUser);

  // * useeffect for changing 'mainuser' state once detected change in firebase user.
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        // console.log(user);
        setMainUser(user.photoURL);
      } else {
        setMainUser('');
      }
    });

    return unsubscribe;
  }, [mainUser]);

  return (
    <>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Heading size="md">Expense Tracker</Heading>

        <Avatar fontSize=".5rem" src={mainUser} />
      </Box>

      <Heading
        fontWeight="300"
        fontSize="2vh"
        // pl={{ base: '1.3rem', md: '1.3rem', lg: '1.3rem' }}
        transform="translateY(-0.8rem)"
        pt="1"
        color="gray.500"
      >
        Powered by Speechly
      </Heading>
    </>
  );
}

export default Main_Heading;
