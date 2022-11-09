const colors = [
  '#008000',
  '#355E3B',
  '#00A36C',
  '#2AAA8A',
  '#4CBB17',
  '#90EE90',
  '#32CD32',
  '#478778',
  '#0BDA51',
  '#98FB98',
];

const red = [
  '#880808',
  '#AA4A44',
  '#EE4B2B',
  '#A52A2A',
  '#800020',
  '#6E260E',
  '#CC5500',
  '#E97451',
  '#702963',
  '#D22B2B',
  '#C41E3A',
  '#D70040',
];

export const incomeCategory = [
  { type: 'Business', amount: 0, color: colors[0] },
  { type: 'Investments', amount: 0, color: colors[1] },
  { type: 'Lottery', amount: 0, color: colors[2] },
  { type: 'Deposits', amount: 0, color: colors[3] },
  { type: 'Gifts', amount: 0, color: colors[4] },
  { type: 'Extra Income', amount: 0, color: colors[5] },
  { type: 'Salary', amount: 0, color: colors[6] },
  { type: 'Savings', amount: 0, color: colors[7] },
  { type: 'Rental Income', amount: 0, color: colors[8] },
];

export const expenseCategory = [
  { type: 'Bills', amount: 0, color: red[0] },
  { type: 'Cars', amount: 0, color: red[1] },
  { type: 'Clothes', amount: 0, color: red[2] },
  { type: 'Travel', amount: 0, color: red[3] },
  { type: 'Food', amount: 0, color: red[4] },
  { type: 'Shopping', amount: 0, color: red[5] },
  { type: 'House', amount: 0, color: red[6] },
  { type: 'Entertainment', amount: 0, color: red[7] },
  { type: 'Phone', amount: 0, color: red[8] },
  { type: 'Pets', amount: 0, color: red[9] },
  { type: 'Other', amount: 0, color: red[10] },
];

export const resetCategories = () => {
  incomeCategory.forEach(income => (income.amount = 0));
  expenseCategory.forEach(expense => (expense.amount = 0));
};

// ? Speechly Commands.
// *add_income {Add} income {[of | for]} $SPEECHLY.NUMBER(amount) {Rupees} {in} $income_category(category) for $SPEECHLY.DATE(date)
// *create_transaction {[Create|Finish|Save]} {transaction}
// *cancel_transaction [Cancel|Delete|Remove|Clear] {transaction}
// *add_category [Set|Change] category {to} [$expense_category|$income_category](category)
// *add_category {[i mean|i meant|i said]} {the} ![category {[is|of]} | [$expense_category|$income_category](category)]
// *add_date [Set|Change|Add] date {[to|for]} $SPEECHLY.DATE(date)
// *add_date {[i mean|i meant|i said]} {[{the} date is|for]} $SPEECHLY.DATE(date)
// *add_amount [Set|Change] amount {to} $SPEECHLY.NUMBER(amount) {dollars}
// *add_amount {[i mean|i meant|i said]} {{the} amount {[is|of]}} $SPEECHLY.NUMBER(amount) {[Rupees | Dollars | Rupee | Dollar]}
// *add_expense {Add} {an} expense ![{[for|of]} $SPEECHLY.NUMBER(amount) {[Rupees | Dollars | Rupee | Dollar]} | {in} | {category} | [$expense_category|$income_category](category) | {[for|in]} $SPEECHLY.DATE(date)]
// *add_expense $SPEECHLY.NUMBER(amount) {[dollar|[Rupees | Dollars | Rupee | Dollar]]} expense {in} ![{category} | [$expense_category|$income_category](category)] {[for|in]} $SPEECHLY.DATE(date)
// *add_income {Add} {[{an} income|{a} balance]} ![{[for|of]} $SPEECHLY.NUMBER(amount) {[Rupees | Dollars | Rupee | Dollar]} | {in} | {category} | [$expense_category|$income_category](category) | {[for|in]} $SPEECHLY.DATE(date)]
// *add_income $SPEECHLY.NUMBER(amount) {[dollar|Rupees| Rupee | Dollar]} [income|balance] {in} ![{category} | [$expense_category|$income_category](category)] {[for|in]} $SPEECHLY.DATE(date)
