import {connect} from 'react-redux';
import {NavigationActions} from '@exponent/ex-navigation';

import ExpenseAssignmentScreen from '../screens/ExpenseAssignmentScreen';
import {setExpenseAssignment} from '../actions/expense';

function mapStateToProps(state) {
  return {
    navigation: state.navigation,
    assignments: state.expense.assignments,
    selectedAssignment: state.expense.selectedAssignment
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setExpenseAssignment: (assignment) => dispatch(setExpenseAssignment(assignment)),
    pop: (uuid) => dispatch(NavigationActions.pop(uuid))
  };
}

const ExpenseAssignmentScreenContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ExpenseAssignmentScreen);

export default ExpenseAssignmentScreenContainer;
