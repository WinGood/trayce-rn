import {connect} from 'react-redux';
import {NavigationActions} from '@exponent/ex-navigation';

import Drawer from '../components/Drawer';
import Router from '../config/router';
import {setDrawer} from '../actions/drawer';
import {logout} from '../actions/userSession';

function mapStateToProps(state) {
  return {
    navigation: state.navigation,
    session: state.userSession
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setDrawer: (drawer) => dispatch(setDrawer(drawer)),
    logout: () => dispatch(logout()),
    replace: (
      from, to
    ) => dispatch(NavigationActions.replace(from, Router.getRoute(to)))
  };
}

const DrawerContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Drawer);

export default DrawerContainer;
