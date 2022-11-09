import React from 'react';
import { Heading } from '@chakra-ui/react';
import { ExpenseTrackerContext } from '../context/context';
import { useContext } from 'react';

function TotalBalance() {
  const { newinitialState } = useContext(ExpenseTrackerContext);

  const current_transactions = newinitialState.map(elem => elem);

  // * Filtering array elements with type "Income".
  const income_list = current_transactions.filter(
    elem => elem.type === 'Income'
  );

  // * Filtering array elements with type "Expense".
  const expense_list = current_transactions.filter(
    elem => elem.type === 'Expense'
  );

  // * Calculating the sum of all amount from the array elemnts.
  const income = income_list.reduce((acc, curr) => (acc += curr.amount), 0);
  const expense = expense_list.reduce((acc, curr) => (acc += curr.amount), 0);

  // * Finding the total using basic math.
  const total = income - expense;

  // * Deciding the color of balance based on the nature of value (eg. Positve/Negatve)
  const balance = {
    color: total > 0 ? 'green' : 'red',
  };

  // // Debugging
  // console.log(current_transactions);
  // console.log({ income, expense });
  // console.log(newinitialState);

  return (
    <>
      <Heading textAlign="center" size="md" p="2rem" pb="0" style={balance}>
        Total Balance ₹ {total}
      </Heading>
    </>
  );
}

export default TotalBalance;
