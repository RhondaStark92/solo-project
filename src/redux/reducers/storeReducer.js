const storeReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_STORES':
      console.log('in set store reducer', action.payload);
      return action.payload;
    default:
      return state;
  }
};

// loginMode will be on the redux state at:
// state.loginMode
export default storeReducer;