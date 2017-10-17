import {createRouter} from '@exponent/ex-navigation';

import LoginScreen from '../containers/LoginScreen';
import SendPasswordScreen from '../screens/SendPasswordScreen';
import SendPasswordSuccessScreen from '../screens/SendPasswordSuccessScreen';
import CreateAccountScreen from '../screens/CreateAccountScreen';
import ChangePasswordScreen from '../screens/ChangePasswordScreen';
import HomeScreen from '../containers/HomeScreen';
import NewExpenseScreen from '../containers/NewExpenseScreen';
import ExpenseCategoryScreen from '../containers/ExpenseCategoryScreen';
import ExpenseAssignmentScreen from '../containers/ExpenseAssignmentScreen';
import ExpenseAttendeeScreen from '../containers/ExpenseAttendeeScreen';
import SendExpenseSuccessScreen from '../screens/SendExpenseSuccessScreen';
import PersonalSettingsScreen from '../containers/PersonalSettingsScreen';
import SettingsPasswordScreen from '../screens/SettingsPasswordScreen';
// SPLASH
import SplashScreen from '../screens/SplashScreen';
// =====
import ExpenseHistoryScreen from '../containers/ExpenseHistoryScreen';
import ExpenseDetailHistoryScreen from '../screens/ExpenseDetailHistoryScreen';
import ExpenseScreen from '../screens/ExpenseScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import CardsScreen from '../screens/CardsScreen';
import NewCardScreen from '../screens/NewCardScreen';
import IncompleteExpenseScreen from '../containers/IncompleteExpenseScreen';
import MyCardsTmp from '../screens/MyCardsTmp.js';

const Router = createRouter(() => ({
  login: () => LoginScreen,
  send_password: () => SendPasswordScreen,
  send_password_success: () => SendPasswordSuccessScreen,
  change_password: () => ChangePasswordScreen,
  create_account: () => CreateAccountScreen,
  home: () => HomeScreen,
  add_expense: () => NewExpenseScreen,
  expense_category: () => ExpenseCategoryScreen,
  expense_assignment: () => ExpenseAssignmentScreen,
  expense_attendee: () => ExpenseAttendeeScreen,
  send_expense_success: () => SendExpenseSuccessScreen,
  personal_settings: () => PersonalSettingsScreen,
  settings_password: () => SettingsPasswordScreen,
  // ====
  splash: () => SplashScreen,
  // ====
  expense_history: () => ExpenseHistoryScreen,
  expense_detail_history: () => ExpenseDetailHistoryScreen,
  expense: () => ExpenseScreen,
  notifications: () => NotificationsScreen,
  cards: () => CardsScreen,
  new_card: () => NewCardScreen,
  incomplete_expense: () => IncompleteExpenseScreen,
  my_cards_tmp: () => MyCardsTmp
}));

export default Router;
