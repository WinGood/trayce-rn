import request from './request';

const methods = {
  userLogin(email, password) {
    return request.post(`/access_tokens?access_token[email]=${email}&access_token[password]=${password}`, {});
  },
  getExpenseCategories() {
    return request.get('/categories');
  },
  getExpenseAssignments() {
    return request.get('/assignments');
  },
  addExpense(expense) {
    const url = `/expenses?expense[status]=pending&expense[payed_date]=${expense.date}&expense[amount]=${expense.valueMoney}&expense[category_id]=${expense.category.id}&expense[comment]=${expense.comment}&expense[currency]=${expense.currency.currency}&expense[is_billable]=${expense.billable}&expense[merchant]=${expense.merchantName}&expense[cloudinary_picture_id]=${expense.cloudinaryId}`;

    return request.post(url)
  },
  getExpenseHistory(year) {
    return request.get(`/expenses/archive?filter[years]=${year}`);
  },
  updateUserField(field, value) {
    return request.patch(`/users/1?user[${field}]=${value}`);
  },
  getUserInfo() {
    return request.get('/users/1');
  }
};

export default methods;