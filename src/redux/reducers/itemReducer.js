const itemReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_ITEMS_FOR_LIST':
      return action.payload;
    default:
      return state;
  }
};

// loginMode will be on the redux state at:
// state.loginMode
export default itemReducer;