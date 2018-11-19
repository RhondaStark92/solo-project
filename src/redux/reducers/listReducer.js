const listReducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_LIST':
      return state;
    default:
      return state;
  }
};

// loginMode will be on the redux state at:
// state.loginMode
export default listReducer;