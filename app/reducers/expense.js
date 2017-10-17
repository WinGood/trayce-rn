import {AsyncStorage} from 'react-native';
const uid = () => Math.random().toString(34).slice(2);

const expense = (
  state = {
    expenses: [],
    history: [],
    incomplete: [],
    categories: [],
    assignments: [],
    selectedAttendees: '',
    selectedCategories: '',
    selectedAssignment: '',
  }, action
) => {
  // console.warn(JSON.stringify(action.type));
  switch (action.type) {
    case 'GET_EXPENSE_HISTORY_SUCCESS':
    {
      const copy = [...state.history];
      copy.push({
        year: action.data.data.years[0],
        months: action.data.data.expense_months
      });

      return {
        ...state,
        history: copy
      }
    }
    case 'GET_EXPENSE_CATEGORIES_SUCCESS':
    {
      return {
        ...state,
        categories: [...action.data.data]
      }
    }
    case 'GET_EXPENSE_ASSIGNMENTS_SUCCESS':
    {
      return {
        ...state,
        assignments: [...action.data.data]
      }
    }
    case 'GET_EXPENSE_CATEGORIES_FAIL':
    {
      // console.warn(JSON.stringify(action.data));
    }
    case 'SET_EXPENSE_CATEGORY':
    {
      const value = (state.selectedCategories && state.selectedCategories.id === action.category.id) ? '' : action.category;

      return {
        ...state,
        selectedCategories: value
      }
    }
    case 'SET_EXPENSE_ASSIGNMENT':
    {
      const value = (state.selectedAssignment && state.selectedAssignment.id === action.assignment.id) ? '' : action.assignment;

      return {
        ...state,
        selectedAssignment: value
      }
    }
    case 'SET_EXPENSE_ATTENDEES':
    {
      return {
        ...state,
        selectedAttendees: action.attendees
      }
    }
    case 'ADD_INCOMPLETE_EXPENSE':
    {
      const copy        = [...state.incomplete];
      const copyExpense = {...action.expense};
      copyExpense.id    = uid();

      copy.push(copyExpense);

      AsyncStorage.setItem('incompleteExpenses', JSON.stringify(copy));

      return {
        ...state,
        incomplete: copy
      }
    }
    // case 'ADD_NEW_EXPENSE_SUCCESS':
    // {
    //   console.warn(JSON.stringify(action));
    // }
    // case 'ADD_NEW_EXPENSE_FAIL':
    // {
    //   console.warn(JSON.stringify(action));
    // }
    case 'REMOVE_EXPENSE_FROM_INCOMPLETE':
    {
      const copy  = [...state.incomplete];
      const index = copy.findIndex(expense => expense.id == action.expense.id);

      copy.splice(index, 1);

      AsyncStorage.setItem('incompleteExpenses', JSON.stringify(copy));

      return {
        ...state,
        incomplete: copy
      }
    }
    // case 'GET_EXPENSE_HISTORY_SUCCESS':
    // {
    //   console.warn(JSON.stringify(action));
    // }
    // case 'GET_EXPENSE_HISTORY_FAIL':
    // {
    //   console.warn(JSON.stringify(action));
    // }
    case 'GET_INCOMPLETE_EXPENSES_FROM_STORAGE_SUCCESS':
    {
      return {
        incomplete: action.data
      };
    }
    case 'RESET_NEW_EXPENSE':
    {
      return {
        ...state,
        selectedCategories: '',
        selectedAssignment: '',
        selectedAttendees: ''
      }
    }
    default:
      return state;
  }
};

export default expense;
