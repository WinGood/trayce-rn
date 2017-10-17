const middleware = store => next => action => {
  if (action.type !== 'STORAGE') {
    return next(action);
  }

  const [successAction, failureAction] = action.actions;

  action.promise
    .then((dataStr) => {
      if (dataStr) {
        const data = JSON.parse(dataStr);
        store.dispatch({
          type: successAction,
          data
        });
      } else {
        store.dispatch({
          type: failureAction
        });
      }
    })
    .done();
}

export default middleware;