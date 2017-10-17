import {connect} from 'react-redux';
import {NavigationActions} from '@exponent/ex-navigation';

import IncompleteExpenseScreen from '../screens/IncompleteExpenseScreen';
import {
  resetNewExpense,
  setExpenseCategory,
  addExpense,
  removeExpenseFromIncomplete,
  setExpenseAssignment
} from '../actions/expense';

function mapStateToProps(state) {
  return {
    selectedCategories: state.expense.selectedCategories,
    selectedAssignment: state.expense.selectedAssignment
  };
}

function mapDispatchToProps(dispatch) {
  return {
    pop: (uuid) => dispatch(NavigationActions.pop(uuid)),
    resetNewExpense: () => dispatch(resetNewExpense()),
    setExpenseCategory: (category) => dispatch(setExpenseCategory(category)),
    setExpenseAssignment: (assignment) => dispatch(setExpenseAssignment(assignment)),
    addExpense: (expense) => dispatch(addExpense(expense)),
    removeExpenseFromIncomplete: (expense) => dispatch(removeExpenseFromIncomplete(expense)),
  };
}

const IncompleteExpenseScreenContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(IncompleteExpenseScreen);

export default IncompleteExpenseScreenContainer;
