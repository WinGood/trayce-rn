import {NavigationReducer} from '@exponent/ex-navigation';

import {combineReducers} from 'redux';
import card from './card';
import drawer from './drawer';
import userSession from './userSession';
import expense from './expense';

const app = combineReducers({
  navigation: NavigationReducer,
  card,
  drawer,
  userSession,
  expense
})

export default app;
