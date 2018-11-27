const StoreCategoryReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_STORE_CATEGORY':
      return action.payload;
    // case 'REORDER_LIST':
    //   console.log('in reorder list', action.payload);
    //   return arrayMove(state, action.payload.oldIndex, action.payload.newIndex);
    default:
      return state;
  }
};

// loginMode will be on the redux state at:
// state.loginMode
export default StoreCategoryReducer;