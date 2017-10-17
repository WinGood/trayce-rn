import {connect} from 'react-redux';

import HomeScreen from '../screens/HomeScreen';

function mapStateToProps(state) {
  return {
    incomplete: state.expense.incomplete
  };
}

const HomeScreenContainer = connect(
  mapStateToProps,
  null
)(HomeScreen);

export default HomeScreenContainer;
