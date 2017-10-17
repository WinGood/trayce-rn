import {connect} from 'react-redux';
import {NavigationActions} from '@exponent/ex-navigation';

import LoginScreen from '../screens/LoginScreen';
import Router from '../config/router';
import {login} from '../actions/userSession';

function mapStateToProps(state) {
  return {
    navigation: state.navigation,
    session: state.userSession
  };
}

function mapDispatchToProps(dispatch) {
  return {
    login: (email, password) => dispatch(login(email, password)),
    push: (from, to) => dispatch(NavigationActions.push(from, Router.getRoute(to))),
    replace: (from, to) => dispatch(NavigationActions.replace(from, Router.getRoute(to))),
  };
}

const LoginScreenContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScreen);

export default LoginScreenContainer;
