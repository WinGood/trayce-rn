class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.name    = this.constructor.name;
    this.message = message;
    this.status  = status;
  }
}

const middleware = store => next => action => {
  if (action.type !== 'API') {
    return next(action);
  }

  const [startAction, successAction, failureAction] = action.actions;

  store.dispatch({
    type: startAction,
    body: action
  });

  action.promise
    .then((response) => {
      if (response._bodyInit) {
        const body = JSON.parse(response._bodyInit);

        if (response.status != 200) {
          throw new ApiError(body.message, response.status);
        }
      }

      return response;
    })
    .then((response) => {
      if (response.json) {
        return response.json();
      }

      return response;
    })
    .then((data) => store.dispatch({
      type: successAction,
      data
    }))
    .catch((error) => {
      store.dispatch({
        type: failureAction,
        code: error.status,
        message: error.message
      })
    });
}

export default middleware;