import { combineReducers } from 'redux';
import errors from './errorsReducer';
import loginMode from './loginModeReducer';
import user from './userReducer';
import list from './listReducer';
import store from './storeReducer';
import storeCategory from './storeCategoryReducer';
import category from './categoryReducer';
import item from './itemReducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  loginMode, // will have a value of 'login' or 'registration' to control which screen is shown
  user, // will have an id and username if someone is logged in
  list, // contains array of items in the shopping_list table
  store, // contains the array of stores in the store table
  storeCategory, // contains the array of categories for the selected store and person
  category, // contains the arry of categories
  item, // contains the array of items
});

export default rootReducer;
