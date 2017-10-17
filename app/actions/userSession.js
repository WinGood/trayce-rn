import api from '../api/index';
import {AsyncStorage} from 'react-native';

export function fetchToken() {
  return {
    type: 'STORAGE',
    actions: ['GET_TOKEN_FROM_STORAGE_SUCCESS', 'GET_TOKEN_FROM_STORAGE_FAIL'],
    promise: AsyncStorage.getItem('token')
  }
}

export function login(email, password) {
  return {
    type: 'API',
    actions: ['USER_LOGIN_REQUEST', 'USER_LOGIN_SUCCESS', 'USER_LOGIN_FAIL'],
    promise: api.userLogin(email, password)
  }
}

export function logout() {
  return {
    type: 'USER_LOGOUT'
  }
}

export function getUserInfo() {
  return {
    type: 'API',
    actions: ['GET_USER_INFO_REQUEST', 'GET_USER_INFO_SUCCESS', 'GET_USER_INFO_FAIL'],
    promise: api.getUserInfo()
  }
}

export function updateField(field, value) {
  return {
    type: 'API',
    actions: ['USER_UPDATE_FIELD_REQUEST', 'USER_UPDATE_FIELD_SUCCESS', 'USER_UPDATE_FIELD_FAIL'],
    promise: api.updateUserField(field, value)
  }
}