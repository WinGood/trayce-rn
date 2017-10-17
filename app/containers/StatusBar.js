import {connect} from 'react-redux';
import {NavigationActions} from '@exponent/ex-navigation';

import StatusBar from '../components/StatusBar';
import {openDrawer} from '../actions/drawer';

function mapStateToProps(state) {
  return {
    navigation: state.navigation
  };
}

function mapDispatchToProps(dispatch) {
  return {
    openDrawer: () => dispatch(openDrawer()),
    pop: (uuid) => dispatch(NavigationActions.pop(uuid))
  };
}

const StatusBarContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(StatusBar);

export default StatusBarContainer;
