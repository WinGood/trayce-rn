import {connect} from 'react-redux';
import {NavigationActions} from '@exponent/ex-navigation';

import App from '../components/App';
import Router from '../config/router';
import {getExpenseCategories, getExpenseAssignments, getExpenseHistory} from '../actions/expense';
import {getUserInfo} from '../actions/userSession';

function mapStateToProps(state) {
  return {
    navigation: state.navigation,
    session: state.userSession
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getExpenseCategories: () => dispatch(getExpenseCategories()),
    getUserInfo: () => dispatch(getUserInfo()),
    getExpenseAssignments: () => dispatch(getExpenseAssignments()),
    getExpenseHistory: (year) => dispatch(getExpenseHistory(year)),
    replace: (from, to) => dispatch(NavigationActions.replace(from, Router.getRoute(to))),
  };
}

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default AppContainer;
