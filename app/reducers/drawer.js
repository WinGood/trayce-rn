const drawer = (
  state = {
    drawer: '',
    isOpened: false
  }, action
) => {
  // console.warn(action.type);
  switch (action.type) {
    case 'SET_DRAWER':
    {
      return {
        ...state,
        drawer: action.drawer
      };
    }
    case 'OPEN_DRAWER':
    {
      state.drawer.openDrawer();
      return {
        ...state,
        isOpened: true
      };
    }
    default:
      return state;
  }
};

export default drawer;
