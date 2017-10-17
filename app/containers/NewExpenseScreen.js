import {connect} from 'react-redux';

import NewExpenseScreen from '../screens/NewExpenseScreen';
import {addIncompleteExpense, resetNewExpense, addExpense} from '../actions/expense';

function mapStateToProps(state) {
  return {
    expense: state.expense
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addIncompleteExpense: (expense) => dispatch(addIncompleteExpense(expense)),
    addExpense: (expense) => dispatch(addExpense(expense)),
    resetNewExpense: () => dispatch(resetNewExpense()),
  };
}

const NewExpenseScreenScreenContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NewExpenseScreen);

export default NewExpenseScreenScreenContainer;
