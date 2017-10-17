import {createNavigationEnabledStore} from '@exponent/ex-navigation';
import {createStore, applyMiddleware} from 'redux';

import apiMiddleware from '../middlewares/api';
import storageMiddleware from '../middlewares/storage';
import reducers from '../reducers';

const createStoreWithNavigation = createNavigationEnabledStore({
  createStore,
  navigationStateKey: 'navigation'
});

const store = createStoreWithNavigation(
  reducers,
  applyMiddleware(
    apiMiddleware,
    storageMiddleware
  )
);

export default store;