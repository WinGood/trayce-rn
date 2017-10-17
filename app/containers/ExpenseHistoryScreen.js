import {connect} from 'react-redux';
import {NavigationActions} from '@exponent/ex-navigation';

import ExpenseHistoryScreen from '../screens/ExpenseHistoryScreen';
import {getExpenseHistory} from '../actions/expense';

function mapStateToProps(state) {
  return {
    navigation: state.navigation,
    history: state.expense.history,
    categories: state.expense.categories,
    assignments: state.expense.assignments,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getExpenseHistory: (year) => dispatch(getExpenseHistory(year)),
    pop: (uuid) => dispatch(NavigationActions.pop(uuid))
  };
}

const ExpenseHistoryScreenContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ExpenseHistoryScreen);

export default ExpenseHistoryScreenContainer;
