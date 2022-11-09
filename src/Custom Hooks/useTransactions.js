import { Legend } from 'chart.js';
import { useContext } from 'react';
import { Chart, registerables } from 'chart.js';
import {
  incomeCategory,
  expenseCategory,
  resetCategories,
} from '../constants/constants';
import { ExpenseTrackerContext } from '../context/context';

Chart.register(...registerables);

const useTransactions = title => {
  resetCategories();
  const { newinitialState } = useContext(ExpenseTrackerContext);

  // console.log(newinitialState);

  // * finding the kind of the transaction (income / expense) .
  const transaction_type = newinitialState.filter(elem => elem.type === title);

  // * finding the sum of the filtered transactions.
  const sum = transaction_type.reduce(
    (acc, curr) => (acc += Number(curr.amount)),
    0
  );

  // * calling categories according to the argument passed to this hook.
  const categories = title === 'Income' ? incomeCategory : expenseCategory;

  // console.log(transaction_type);

  // * finding whether the category we gave, matches in our summoned categories.
  transaction_type.forEach(transaction => {
    const category = categories.find(
      // * type in categories from constants file contains catageories like business, bills etc.
      elem => elem.type === transaction.category
    );

    // * if the category matches, increment using previous category amount plus transaction category amount.
    if (category) category.amount += transaction.amount;
  });

  // * categories which has money in them.
  const filtered_categories = categories.filter(elem => elem.amount > 0);

  // console.log({
  //   transactions,
  //   sum,
  //   categories,
  //   filtered_categories,
  //   transaction_type,
  // });

  // console.log(filtered_categories);

  // * defining data for chart.
  const chartData = {
    type: 'doughnut',
    labels: filtered_categories.map(elem => elem.type),
    datasets: [
      {
        label: 'Income/Expense',
        data: filtered_categories.map(elem => elem.amount),
        backgroundColor: filtered_categories.map(elem => elem.color),
        hoverOffset: 4,
        options: {
          legend: {
            maintainAspectRatio: true,
            display: true,
          },
        },
      },
    ],
  };

  // console.log(chartData);

  return { filtered_categories, chartData, sum };
};

export default useTransactions;
