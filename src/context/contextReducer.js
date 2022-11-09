const contextReducer = (state, action) => {
  switch (action.type) {
    case 'DELETE_TRANSACTIONS':
      const deletedTransaction = state.filter(
        // ? action.payload is the id provided to deleteTransaction function.
        transaction => {
          return transaction.id !== action.payload;
        }
      );
      return deletedTransaction;
    case 'RESET_TRANSACTIONS':
      const resetTransaction = [];
      return resetTransaction;
    case 'ADD_TRANSACTIONS':
      const addedTransaction = [action.payload, ...state];
      return addedTransaction;
    case 'CALL_TRANSACTIONS':
      const calledTransaction = action.payload;
      return calledTransaction;
    default:
      return state;
  }
};

export default contextReducer;
