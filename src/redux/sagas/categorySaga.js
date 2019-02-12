import axios from 'axios';
import { put, call, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_CATEGORY" actions
function* fetchCategory(action) {
  console.log('in fetch category Saga', action.payload);
  
  try {
    const response = yield axios.get('api/category');
    console.log('response from list:', response);
    
    // now that the session has given us a user object
    // with an id and username set the client-side user object to let
    // the client-side code know the user is logged in
    yield put({ type: 'SET_CATEGORY', payload: response.data });
  } catch (error) {
    console.log('Category get request failed', error);
  }
}

// worker SAGA: will be fired on 'ADD_CATEGORY' actions
// user entered a new category
function* addCategory(action) {
  try {
      // axios asynch call to add category on database
      yield call(axios.post, '/api/category', action.payload);
      // will need to make a call to update the list of category
      yield put( { type: 'FETCH_CATEGORY' } );
  }
  catch (error) {
      console.log('error with add category post request');
  }
}

// worker SAGA: will be fired on 'DELETE_CATEGORY' actions
function* deleteCategory(action) {
  try {
    //axios call to remove selected category
    yield call(axios.delete, '/api/category', {params: {id: action.payload}});
    // will need to make a call to update the list of catgories
    yield put( { type: 'FETCH_CATEGORY' } );
  }
  catch (error) {
    console.log('error with delete request to /api/store');
  } 
}

// worker SAGA: will be fired on 'UPDATE_CATEGORY' actions
function* updateCategory(action) {
  console.log('in updateCategory saga', action.payload)
  try {
      // axios asynch call to add category on database
      yield call(axios.put, '/api/category', action.payload);
      // will need to make a call to update the list of category
      yield put( { type: 'FETCH_CATEGORY' } );
  }
  catch (error) {
      console.log('error with update category post request');
  }
}

// worker SAGA: will be fired on 'ADD_CATEGORY_FOR_USER' actions
// new user created .. add the default categories
// function* addCategoryForUser(action) {
//   try {
//       // axios asynch call to add category on database
//       yield call(axios.post, '/api/category/user', action.payload);
//       // will need to make a call to update the list of category
//       yield put( { type: 'FETCH_CATEGORY' } );
//   }
//   catch (error) {
//       console.log('error with add category post request');
//   }
// }

function* categorySaga() {
  yield takeLatest('FETCH_CATEGORY', fetchCategory);
  yield takeLatest('ADD_CATEGORY', addCategory);
  yield takeLatest('DELETE_CATEGORY', deleteCategory);
  yield takeLatest('UPDATE_CATEGORY', updateCategory);
  // yield takeLatest('ADD_CATEGORY_FOR_USER', addCategoryForUser);
}

export default categorySaga;
