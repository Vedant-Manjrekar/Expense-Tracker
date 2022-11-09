import { Stack } from '@chakra-ui/react';
import React from 'react';
import List from './List';
import { v4 as uuidv4 } from 'uuid';

function ListHolder({ data, transactions, pic }) {
  return (
    <Stack
      overflow="scroll"
      height="10rem"
      h={{
        base: '10rem',
        md: '10rem',
        lg: '23vh',
        xl: '26vh',
      }}
    >
      {transactions.map(data => {
        return (
          <List
            id={data.id}
            category={data.category}
            key={uuidv4()}
            amount={data.amount}
            type={data.type}
            date={data.date}
          />
        );
      })}
    </Stack>
  );
}

export default ListHolder;
