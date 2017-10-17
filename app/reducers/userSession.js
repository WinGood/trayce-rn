import {AsyncStorage} from 'react-native';

const userSession = (
  state = {
    token: '',
    userInfo: '',
    fetchToken: false,
    loading: false,
    error: false
  }, action
) => {
  switch (action.type) {
    case 'GET_TOKEN_FROM_STORAGE_SUCCESS':
    {
      return {
        ...state,
        error: false,
        fetchToken: true,
        token: action.data.token
      };
    }
    case 'GET_TOKEN_FROM_STORAGE_FAIL':
    {
      return {
        ...state,
        error: false,
        fetchToken: true
      };
    }
    case 'USER_LOGIN_REQUEST':
    {
      return {
        ...state,
        loading: true,
        error: false,
        fetchToken: true
      }
    }
    case 'USER_LOGIN_SUCCESS':
    {
      AsyncStorage.setItem('token', JSON.stringify({
        token: action.data.data.access_token
      }));

      return {
        ...state,
        loading: false,
        error: false,
        token: action.data.data.access_token
      }
    }
    case 'USER_LOGIN_FAIL':
    {
      return {
        ...state,
        loading: false,
        error: true
      }
    }
    case 'GET_USER_INFO_SUCCESS':
    {
      console.warn(JSON.stringify(action.data));
      return {
        ...state,
        userInfo: ''
      }
    }
    case 'USER_LOGOUT':
    {
      AsyncStorage.removeItem('token');
      AsyncStorage.removeItem('incompleteExpenses');
      
      return {
        ...state,
        token: ''
      }
    }
    case 'GET_EXPENSE_CATEGORIES_FAIL':
    {
      if (action.code == 401) {
        AsyncStorage.removeItem('token');
        AsyncStorage.removeItem('incompleteExpenses');
        return {
          ...state,
          token: ''
        }
      }

      return state;
    }
    case 'GET_EXPENSE_ASSIGNMENTS_FAIL':
    {
      if (action.code == 401) {
        AsyncStorage.removeItem('token');
        AsyncStorage.removeItem('incompleteExpenses');
        return {
          ...state,
          token: ''
        }
      }

      return state;
    }
    case 'GET_EXPENSE_HISTORY_FAIL':
    {
      if (action.code == 401) {
        AsyncStorage.removeItem('token');
        AsyncStorage.removeItem('incompleteExpenses');
        return {
          ...state,
          token: ''
        }
      }

      return state;
    }
    case 'ADD_NEW_EXPENSE_FAIL':
    {
      if (action.code == 401) {
        AsyncStorage.removeItem('token');
        AsyncStorage.removeItem('incompleteExpenses');
        return {
          ...state,
          token: ''
        }
      }

      return state;
    }
    default:
      return state;
  }
};

export default userSession;
