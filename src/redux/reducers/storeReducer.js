const storeReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_STORES':
      return action.payload;
    default:
      return state;
  }
};

// loginMode will be on the redux state at:
// state.loginMode
export default storeReducer;