const StoreCategoryReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_STORE_CATEGORY':
      return action.payload;
    default:
      return state;
  }
};

// loginMode will be on the redux state at:
// state.loginMode
export default StoreCategoryReducer;