const card = (
  state = [{
    card: '1458-1234-6443-2564'
  }], action
) => {
  switch (action.type) {
    case 'ADD_CARD':
    {
      return Object.assign({}, state, {
        cards: state.cards.concat([{
          number: action.card,
        }]),
      })
    }
    default:
      return state;
  }
};

export default card;
