import React, { useContext, useEffect, useState } from 'react';
import { Box, Stack, Text } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { ExpenseTrackerContext } from '../context/context';
import { auth } from '../firebase/firebase';
import { GiReceiveMoney } from 'react-icons/gi';
import { GiPayMoney } from 'react-icons/gi';

function List({ type, category, amount, date, id }) {
  const { getData } = useContext(ExpenseTrackerContext);

  // * state for user photo.
  const [photoUrl, setPhotoUrl] = useState();

  // * state for user name.
  const [user, setUser] = useState();

  // * function for deleting a document.
  function deleteDocument(ids) {
    deleteDoc(doc(db, 'Expenses', user, user.slice(0, 3), ids));
    getData(user);
  }

  // * fetching user data.
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setPhotoUrl(user.photoURL);
        setUser(user.email);
      }

      return unsubscribe;
    });
  }, [photoUrl]);

  // * style for icon.
  const styleIcon = {
    fontSize: '1.5rem',
    color: type === 'Income' ? 'green' : 'red',
  };

  // * which icon to display.
  const flag =
    type === 'Income' ? (
      <GiReceiveMoney style={styleIcon} />
    ) : (
      <GiPayMoney style={styleIcon} />
    );

  return (
    <>
      <Box
        textAlign="center"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        gap="1rem"
        pb="1rem"
        pr="1rem"
        pl="1rem"
      >
        <Stack display="flex" flexDirection="row" alignItems="center" gap="3">
          {flag}
          <Stack>
            <Text fontWeight="bold">{category}</Text>
            <Text pr="1.3rem">₹ {amount}</Text>
          </Stack>
        </Stack>

        <Text fontSize={'.8rem'} transform="translateX(60px)" mb="3.5vh">
          [{date}]
        </Text>
        <DeleteIcon
          transform="translateY(1rem)"
          className="delete"
          onClick={() => deleteDocument(id)}
        />
      </Box>
    </>
  );
}

export default List;
