import {connect} from 'react-redux';
import {NavigationActions} from '@exponent/ex-navigation';

import PersonalSettingsScreen from '../screens/PersonalSettingsScreen';
import {updateField} from '../actions/userSession';

// function mapStateToProps(state) {
//   return {
//     navigation: state.navigation,
//     history: state.expense.history
//   };
// }

function mapDispatchToProps(dispatch) {
  return {
    updateField: (field, value) => dispatch(updateField(field, value)),
    pop: (uuid) => dispatch(NavigationActions.pop(uuid))
  };
}

const PersonalSettingsScreenContainer = connect(
  null,
  mapDispatchToProps
)(PersonalSettingsScreen);

export default PersonalSettingsScreenContainer;
