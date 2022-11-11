import React, { useState, useEffect } from 'react';
import { Box, Divider, Grid, Avatar } from '@chakra-ui/react';
import Income_Expense from './Income_Expense';
import Main_Heading from './Main_Heading';
import TotalBalance from './TotalBalance';
import MainInput from './MainInput';
import MainForm from './MainForm';
import ListHolder from './ListHolder';
import { useContext } from 'react';
import { ExpenseTrackerContext } from '../context/context';
import { extendTheme } from '@chakra-ui/react';
import { FaPowerOff } from 'react-icons/fa';
import { auth } from '../firebase/firebase';
import {
  PushToTalkButton,
  PushToTalkButtonContainer,
} from '@speechly/react-ui';

// // custom breakpoints for Chakra UI.
const breakpoints = {
  sm: '666px',
  md: '768px',
  lg: '960px',
  xl: '1200px',
  '2xl': '1536px',
};

const theme = extendTheme({ breakpoints });

function MainComp() {
  // * state and function from context.
  const { newinitialState, signOutGoogle } = useContext(ExpenseTrackerContext);

  // * function for logging out.
  function Logout() {
    const confirmation = window.confirm('Do you wanna Logout?');
    confirmation && signOutGoogle();
  }

  return (
    <>
      <div className="signout">
        <button onClick={Logout}>
          <FaPowerOff />
        </button>
      </div>
      <Grid
        className="main"
        templateColumns={{
          sm: 'auto',
          md: 'auto',
          lg: '1fr 1fr 1fr',
        }}
        h={{ base: 'stretch', md: 'stretch', lg: '100vh' }}
        alignItems="center"
        justifyContent={{ base: 'center', sm: 'center', md: null, lg: null }}
        padding="2rem"
        gap={8}
      >
        {/* Income */}
        <Income_Expense
          heading={'Income'}
          color={'green.300'}
          content={'$50'}
          justifyContent={{ base: 'center', md: null, lg: null }}
          w={{ base: '70vw', md: '30vw', lg: '30vw' }}
          gridRow={{ sm: null, md: 1, lg: 1 }}
        />

        {/* middlebox */}
        <Box
          backgroundColor="white"
          gridRow={{ base: 1, sm: 1, md: null, lg: null }}
          // h="70vh"
          p="1rem"
          borderRadius="8px"
          w={{
            base: null,
            md: '-webkit-fill-available',
            lg: '-webkit-fill-available',
          }}
          h={{
            base: '-webkit-fill-available',
            md: '85vh',
            lg: '83vh',
          }}
          gridColumn={{ lg: 2 }}
        >
          <Main_Heading />

          <TotalBalance />

          <MainInput />

          <Divider orientation="horizontal" pt="1rem" />

          <MainForm />

          <ListHolder transactions={newinitialState} />
        </Box>

        {/* Expense */}
        <Income_Expense
          heading={'Expense'}
          color={'red.400'}
          content={'$50'}
          w={{ base: '70vw', md: '30vw', lg: '30vw' }}
        />
      </Grid>

      <PushToTalkButtonContainer>
        <PushToTalkButton />
      </PushToTalkButtonContainer>
    </>
  );
}

export default MainComp;

// ? Dummy Data
// const data = [
//   {
//     mode: 'Income',
//     amount: '$50',
//     flag: 'green',
//   },
//   {
//     mode: 'Expense',
//     amount: '$50',
//     flag: 'red',
//   },
//   {
//     mode: 'Expense',
//     amount: '$5',
//     flag: 'red',
//   },
//   {
//     mode: 'Income',
//     amount: '$50',
//     flag: 'green',
//   },
// ];
