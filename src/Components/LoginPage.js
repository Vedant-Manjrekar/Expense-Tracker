import { Box, Grid } from '@chakra-ui/react';
import React from 'react';
import { useContext } from 'react';
import { ExpenseTrackerContext } from '../context/context';
import { Text } from '@chakra-ui/react';
import LoginImage from '../assets/money-login.jpeg';
import { FcGoogle } from 'react-icons/fc';
import { AiFillFacebook } from 'react-icons/ai';

function LoginPage() {
  const { LoginUsingGoogle, LoginUsingFacebook } = useContext(
    ExpenseTrackerContext
  );
  return (
    <div className="login">
      <Grid
        m="5vw"
        h="80vh"
        textAlign="center"
        boxShadow=" 0px 3px 23px 0px gray"
        gridTemplateColumns={{ base: '1fr', md: '1fr', lg: '1fr 1fr' }}
        borderTopLeftRadius="12px"
      >
        {/* Box 1 */}
        <Box
          className="b1"
          h="80vh"
          display="grid"
          alignItems={'center'}
          // flexDirection="column"
          justifyContent="space-around"
          backgroundColor="#f4f6f9"
        >
          <Text
            fontSize="2xl"
            textAlign="center"
            opacity="1"
            fontFamily="PT Sans, sans-serif"
          >
            Welcome to Expense Tracker
          </Text>
          <Grid
            h="40vh"
            w={{ base: '41vw', md: '41vw', lg: '20vw' }}
            justifyContent="center"
            alignItems="center"
            boxShadow="20px 20px 60px #bebebe,
            -20px -20px 60px #ffffff;"
            borderRadius="50px"
            backgroundColor="whitesmoke"
            transform="translateY(-3rem)"
            margin="auto"
          >
            <Box
              h="5vh"
              display="flex"
              justifyContent="center"
              alignItems="center"
              p="0 10px"
              onClick={LoginUsingGoogle}
              fontFamily="Overpass, sans-serif"
            >
              Continue using &nbsp; {<FcGoogle />}
            </Box>
            <Box
              h="2vh"
              display="flex"
              justifyContent="center"
              alignItems="center"
              p="0 10px"
              onClick={LoginUsingGoogle}
              fontFamily="PT Sans, sans-serif"
            >
              OR
            </Box>
            <Box
              h="5vh"
              display="flex"
              justifyContent="center"
              alignItems="center"
              p="0 10px"
              onClick={LoginUsingFacebook}
              // fontFamily="PT Sans, sans-serif"
              fontFamily="Overpass, sans-serif"
            >
              Continue using &nbsp; {<AiFillFacebook />}
            </Box>
          </Grid>
        </Box>

        {/* Box 2 */}
        <Box
          className="b2"
          display={{ base: 'none', md: 'none', lg: 'flex' }}
          h="80vh"
          opacity=".8"
          boxShadow="0 0 200px rgba(0,0,0,0.9) inset;"
        >
          <img className="loginImg" src={LoginImage} alt="login-image" />
        </Box>
      </Grid>
    </div>
  );
}

// <div onClick={LoginUsingGoogle} className="google">
export default LoginPage;
