import {
  Box,
  Button,
  Grid,
  Input,
  FormControl,
  FormLabel,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import React, { useRef } from 'react';
import { useContext } from 'react';
import { ExpenseTrackerContext } from '../context/context';
import { Text } from '@chakra-ui/react';
import LoginImage from '../assets/money-login.jpeg';
import { FcGoogle } from 'react-icons/fc';
import { AiFillFacebook } from 'react-icons/ai';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '../firebase/firebase';
import { useDisclosure } from '@chakra-ui/react';

function LoginPage() {
  const { LoginUsingGoogle, LoginUsingFacebook } = useContext(
    ExpenseTrackerContext
  );

  const { isOpen, onOpen, onClose } = useDisclosure();

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const signUpUser = event => {
    event.preventDefault();

    createUserWithEmailAndPassword(
      auth,
      emailRef.current.value,
      passwordRef.current.value
    )
      .then(user => {
        console.log(user);
      })
      .catch(error => {
        alert(error.message);
      });
  };

  const loginUser = event => {
    event.preventDefault();

    signInWithEmailAndPassword(
      auth,
      emailRef.current.value,
      passwordRef.current.value
    )
      .then(user => {
        console.log(user);
      })
      .catch(error => {
        console.log(error.message);
      });
  };

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
        {/* // * Box 1 */}
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
            h="50vh"
            w={{ base: '41vw', md: '41vw', lg: '27vw' }}
            justifyContent="space-evenly"
            alignItems="center"
            boxShadow="20px 20px 60px #bebebe,
            -20px -20px 60px #ffffff;"
            borderRadius="50px"
            backgroundColor="whitesmoke"
            // transform="translateY(-3rem)"
            margin="auto"
          >
            <Box>
              {/* Login using Google */}
              <Box
                h="5vh"
                display="flex"
                justifyContent="center"
                alignItems="center"
                p="0 10px"
                onClick={LoginUsingGoogle}
                backgroundColor="beige"
                fontFamily="Overpass, sans-serif"
              >
                Continue using &nbsp; {<FcGoogle />}
              </Box>

              {/* 'OR' Text */}
              <Box
                h="2vh"
                display="flex"
                justifyContent="center"
                alignItems="center"
                p="0 10px"
                m="1rem 0"
                fontFamily="Overpass, sans-serif"
              >
                OR
              </Box>

              {/* Login field */}
              <FormControl isRequired display="grid">
                <Input
                  placeholder="Email"
                  ref={emailRef}
                  size="sm"
                  id="email"
                  w={{ base: '34vw', md: '34vw', lg: '15vw' }}
                  m="1rem 0"
                />
                <Input
                  placeholder="Password"
                  size="sm"
                  ref={passwordRef}
                  id="pass"
                  type="password"
                  w={{ base: '34vw', md: '34vw', lg: '15vw' }}
                />

                <Button
                  variant={'outline'}
                  colorScheme="teal"
                  onClick={loginUser}
                  size="sm"
                  m="1rem 0"
                >
                  Login
                </Button>
              </FormControl>

              {/* SignUp Field */}
              <form action="/">
                <Modal isOpen={isOpen} onClose={onClose}>
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>SignUp</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                      <FormControl isRequired>
                        <FormLabel mt={'1rem'} ml=".5rem">
                          First name
                        </FormLabel>
                        <Input placeholder="First name" required />
                        <FormLabel mt={'1rem'} ml=".5rem">
                          Last name
                        </FormLabel>
                        <Input placeholder="Last name" required />
                        <FormLabel mt={'1rem'} ml=".5rem">
                          Email
                        </FormLabel>
                        <Input placeholder="Email" ref={emailRef} required />
                        <FormLabel mt={'1rem'} ml=".5rem">
                          Password
                        </FormLabel>
                        <Input
                          placeholder="Password"
                          type="password"
                          ref={passwordRef}
                          required
                        />
                      </FormControl>
                    </ModalBody>

                    <ModalFooter>
                      <Button colorScheme="blue" mr={3} onClick={onClose}>
                        Close
                      </Button>
                      <Button
                        variant="outline"
                        type="submit"
                        onClick={signUpUser}
                      >
                        SignUp
                      </Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
              </form>
            </Box>
          </Grid>

          <Text display="flex" m="auto" fontSize="sm">
            Are you new here? &nbsp;
            <Text
              onClick={onOpen}
              fontSize="sm"
              textDecorationLine="underline"
              textDecoration=""
              size="sm"
            >
              SignUp
            </Text>
          </Text>
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
