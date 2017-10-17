import api from '../api/index';
import {AsyncStorage} from 'react-native';

export function getExpenseCategories() {
  return {
    type: 'API',
    actions: ['GET_EXPENSE_CATEGORIES_REQUEST', 'GET_EXPENSE_CATEGORIES_SUCCESS', 'GET_EXPENSE_CATEGORIES_FAIL'],
    promise: api.getExpenseCategories()
  }
}

export function getExpenseAssignments() {
  return {
    type: 'API',
    actions: ['GET_EXPENSE_ASSIGNMENTS_REQUEST', 'GET_EXPENSE_ASSIGNMENTS_SUCCESS', 'GET_EXPENSE_ASSIGNMENTS_FAIL'],
    promise: api.getExpenseAssignments()
  }
}

export function fetchIncompleteExpenses() {
  return {
    type: 'STORAGE',
    actions: ['GET_INCOMPLETE_EXPENSES_FROM_STORAGE_SUCCESS', 'GET_INCOMPLETE_EXPENSES_FROM_STORAGE_FAIL'],
    promise: AsyncStorage.getItem('incompleteExpenses')
  }
}

export function addExpense(expense) {
  return {
    type: 'API',
    actions: ['ADD_NEW_EXPENSE_REQUEST', 'ADD_NEW_EXPENSE_SUCCESS', 'ADD_NEW_EXPENSE_FAIL'],
    promise: api.addExpense(expense)
  }
}

export function getExpenseHistory(year) {
  return {
    type: 'API',
    actions: ['GET_EXPENSE_HISTORY_REQUEST', 'GET_EXPENSE_HISTORY_SUCCESS', 'GET_EXPENSE_HISTORY_FAIL'],
    promise: api.getExpenseHistory(year)
  }
}

export function removeExpenseFromIncomplete(expense) {
  return {
    type: 'REMOVE_EXPENSE_FROM_INCOMPLETE',
    expense
  }
}

export function setExpenseCategory(category) {
  return {
    type: 'SET_EXPENSE_CATEGORY',
    category
  }
}

export function setExpenseAssignment(assignment) {
  return {
    type: 'SET_EXPENSE_ASSIGNMENT',
    assignment
  }
}

export function setExpenseAttendees(attendees) {
  return {
    type: 'SET_EXPENSE_ATTENDEES',
    attendees
  }
}

export function addIncompleteExpense(expense) {
  return {
    type: 'ADD_INCOMPLETE_EXPENSE',
    expense
  }
}

export function resetNewExpense() {
  return {
    type: 'RESET_NEW_EXPENSE'
  }
}