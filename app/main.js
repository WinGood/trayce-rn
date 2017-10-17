import React, {Component} from 'react';
import {Provider} from 'react-redux';

import App from './containers/App';
import store from './config/store';

import {fetchToken} from './actions/userSession';
import {fetchIncompleteExpenses} from './actions/expense';

store.dispatch(fetchToken());
store.dispatch(fetchIncompleteExpenses());

function Main() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

export default Main;
