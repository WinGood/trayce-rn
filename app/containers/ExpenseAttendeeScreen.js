import {connect} from 'react-redux';
import {NavigationActions} from '@exponent/ex-navigation';

import ExpenseAttendeeScreen from '../screens/ExpenseAttendeeScreen';
import {setExpenseAttendees} from '../actions/expense';

function mapStateToProps(state) {
  return {
    navigation: state.navigation,
    selectedAttendees: state.expense.selectedAttendees
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setExpenseAttendees: (attendees) => dispatch(setExpenseAttendees(attendees)),
    pop: (uuid) => dispatch(NavigationActions.pop(uuid))
  };
}

const ExpenseAttendeeScreenContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ExpenseAttendeeScreen);

export default ExpenseAttendeeScreenContainer;
