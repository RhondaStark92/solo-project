const StoreCategoryReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_STORE_CATEGORY':
      return action.payload;
    // case 'REORDER_LIST':
    //   console.log('in reorder list', action.payload);
    //   return arrayMove(state, action.payload.oldIndex, action.payload.newIndex);
    case 'CATEGORIES_FOR_STORE':
      console.log('in categories for store', action.payload);
      const newArray = state.filter(cat => cat.store_id === action.payload);
      return newArray;
      // this.props.storeCategory.filter(cat => cat.store_id === this.props.storeIn.id);
    default:
      return state;
  }
};

// loginMode will be on the redux state at:
// state.loginMode
export default StoreCategoryReducer;