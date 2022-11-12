import { Grid, FormControl, Select, Input, Button } from '@chakra-ui/react';
import React, { useState, useContext, useEffect } from 'react';
import { ExpenseTrackerContext } from '../context/context';
import { v4 as uuidv4 } from 'uuid';
import { incomeCategory, expenseCategory } from '../constants/constants';
import formatDate from '../utils/formatDate';
import { useSpeechContext } from '@speechly/react-client';
import { deleteDoc, doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { auth } from '../firebase/firebase';

// * Initialstate to avoid undefined error.
const initialState = {
  id: '',
  amount: 0,
  type: 'Income',
  category: '',
  date: formatDate(new Date()),
};

function MainForm() {
  // * State for the data gathered from different inputs.
  const [formData, setFormData] = useState(initialState);

  // * importing state and function from context.
  const { getData, newinitialState } = useContext(ExpenseTrackerContext);

  // * function to delete all data.
  const deleteCollection = () => {
    newinitialState.map(elem =>
      deleteDoc(doc(db, 'Expenses', user, user.slice(0, 3), elem.id))
    );
    getData(user);
  };

  // * hook from speechly.
  const { segment } = useSpeechContext();

  useEffect(() => {
    if (segment) {
      if (segment.intent.intent === 'add_expense') {
        setFormData({ ...formData, type: 'Expense' });
      } else if (segment.intent.intent === 'add_income') {
        setFormData({ ...formData, type: 'Income' });
      } else if (
        segment.intent.isFinal &&
        segment.intent.intent === 'create_transaction'
      ) {
        return createTransactions();
      } else if (
        segment.intent.isFinal &&
        segment.intent.intent === 'cancel_transaction'
      ) {
        return setFormData(initialState);
      } else if (segment.intent.intent === 'reset_account') {
        return deleteCollection();
      }

      // // Example of entity.
      // //  0:
      // ? endPosition: 7
      // ? isFinal: true
      // ? startPosition: 5
      // ? type: "amount"
      // ? value: "200"

      // //  1:
      // ? endPosition: 13
      // ? isFinal: true
      // ? startPosition: 12
      // ? type: "category"
      // ? value: "TRAVEL"

      // * Mapping the data from speechly (Voice Input.)
      segment.entities.forEach(entity => {
        const category = `${entity.value.charAt(0)}${entity.value
          .slice(1)
          .toLowerCase()}`;

        // * checking for diiferent entitiy types using switch case and performing a certain function for a certain type.
        switch (entity.type) {
          case 'amount':
            setFormData({ ...formData, amount: Number(entity.value) });
            break;

          case 'category':
            // * Function to check in which 'type' does the asked 'category' belongs by the user.

            function findIncomeExpense(category) {
              // * checks for the category in the defined "income" and "expense" category from 'constants.js' and returns the object if present.
              const income = incomeCategory.filter(
                elem => elem.type === category
              );
              const expense = expenseCategory.filter(
                elem => elem.type === category
              );

              if (income.length >= 1) {
                return 'Income';
              } else if (expense.length >= 1) {
                return 'Expense';
              }
            }

            setFormData({
              ...formData,
              type: findIncomeExpense(category),
              category: category,
            });
            break;

          case 'date':
            setFormData({ ...formData, date: entity.value });
            break;

          default:
            break;
        }
      });

      // * if all the conditions result true execute "createTransactions()"
      if (
        segment.isFinal &&
        formData.amount &&
        formData.category &&
        formData.date &&
        formData.type
      ) {
        createTransactions();
      }
    }
  }, [segment]);

  // * State to store data of user fetched from firebase.
  const [user, setUser] = useState();

  // * Storing either income or expense category depending whether user chooses income or expense
  const selectedCategory =
    formData.type === 'Income' ? incomeCategory : expenseCategory;

  // console.log(formData);
  // console.log(user);

  // * checking if user loggedout or there is a nee signin, if yes change 'user' state.
  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        setUser(user.email);
      }
    });
  }, [user]);

  // * Function to create transactions.
  function createTransactions() {
    if (Number.isNaN(Number(formData.amount) || !formData.date.includes('-')))
      return;

    const id = uuidv4();

    // * Creating Document when a transaction is created. (more like collection inside a document.)
    setDoc(doc(db, 'Expenses', user, user.slice(0, 3), id), {
      ...formData,
      id,
    });
    setFormData(initialState);
    getData(user);
    document.getElementById('amount').value = '';
  }

  // * Function to add type.
  function addType(e) {
    setFormData({ ...formData, type: e.target.value });
  }

  // * Function to add Category.
  function addCategory(e) {
    setFormData({ ...formData, category: e.target.value });
  }

  // * Function to add Amount
  function addAmount(e) {
    setFormData({ ...formData, amount: Number(e.target.value) });
  }

  // * Function to add Date
  function addDate(e) {
    setFormData({ ...formData, date: formatDate(e.target.value) });
  }

  return (
    <>
      {/* Type */}
      <FormControl>
        <Grid gridTemplateColumns={'1fr 1fr'} gap="1" p={'2'}>
          <Select placeholder="Type" value={formData.type} onChange={addType}>
            <option>Income</option>
            <option>Expense</option>
          </Select>

          {/* Category */}
          <Select
            placeholder="Category"
            value={formData.category}
            onChange={addCategory}
            isRequired={true}
          >
            {/* Mapping the 'selectedCategory array. */}
            {selectedCategory.map(category => (
              <option key={category.type} value={category.type}>
                {category.type}{' '}
              </option>
            ))}
          </Select>

          {/* Amount Input */}
          <Input
            placeholder="Amount"
            type="number"
            id="amount"
            onChange={addAmount}
          />

          {/* Date Input */}
          <Input type="date" onChange={addDate} />
        </Grid>

        {/* Create Button */}
        <Button
          variant="outline"
          w="stretch"
          m=" 1rem 0.5rem"
          colorScheme="blue"
          onClick={createTransactions}
        >
          Create
        </Button>
      </FormControl>
    </>
  );
}

export default MainForm;
