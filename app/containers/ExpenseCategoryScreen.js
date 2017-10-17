import {connect} from 'react-redux';
import {NavigationActions} from '@exponent/ex-navigation';

import ExpenseCategoryScreen from '../screens/ExpenseCategoryScreen';
import {setExpenseCategory} from '../actions/expense';

function mapStateToProps(state) {
  return {
    navigation: state.navigation,
    categories: state.expense.categories,
    selectedCategories: state.expense.selectedCategories
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setExpenseCategory: (category) => dispatch(setExpenseCategory(category)),
    pop: (uuid) => dispatch(NavigationActions.pop(uuid))
  };
}

const ExpenseCategoryScreenContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ExpenseCategoryScreen);

export default ExpenseCategoryScreenContainer;
