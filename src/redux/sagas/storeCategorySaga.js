import axios from 'axios';
import { put, call, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_STORE_CATEGORY" actions
function* fetchStoreCategory(action) {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };
    // axios asynch call to retrieve the stores from the database
    const response = yield axios.get('api/store_category', {params: {id: action.payload}});
    // send response to the redux store
    yield put({ type: 'SET_STORE_CATEGORY', payload: response.data });
  } catch (error) {
    console.log('User get store categories request failed', error);
  }
}

// worker Saga: will be fired on "UPDATE_CATEGORY_ORDER" actions
function* updateCategoryOrder(action) {
  let from=action.payload.oldIndex + 1;
  let to=action.payload.newIndex + 1;
  let store=action.payload.storeId;
  console.log('in updateCategoryOrder,', from, to, store);
  
  try {
    //axios call to update category ordering
    console.log('in try of update');
    yield call(axios.put, '/api/store_category/order1', {params: {old: from, new: to, store: store}});
    yield call(axios.put, '/api/store_category/order2', {params: {old: from, new: to, store: store}});
    yield call(axios.put, '/api/store_category/order3', {params: {old: from, new: to, store: store}});
    // yield put( { type: 'SET_STORE_CATEGORY'} );
  }
  catch (error) {
    console.log('error with update category order to /api/store_category');
    
  }
}

// worker SAGA: will be fired on 'ADD_STORE' actions
// function* addStore(action) {
//   try {
//       // axios asynch call to add store on database
//       yield call(axios.post, '/api/store', action.payload);
//       // will need to make a call to update the list of stores
//       yield put( { type: 'FETCH_STORES' } );
//   }
//   catch (error) {
//       console.log('error with add list post request');
//   }
// }

// // worker SAGA: will be fired on 'DELETE_STORE' actions
// function* deleteStore(action) {
//   try {
//     //axios call to remove selected item from shopping list
//     yield call(axios.delete, '/api/store', {params: {id: action.payload}});
//     // will need to make a call to update the list of items
//     yield put( { type: 'FETCH_STORES' } );
//   }
//   catch (error) {
//     console.log('error with delete request to /api/store');
//   } 
// }

function* storeSaga() {
  yield takeLatest('FETCH_STORE_CATEGORY',fetchStoreCategory);
  yield takeLatest('UPDATE_CATEGORY_ORDER', updateCategoryOrder)
  // yield takeLatest('ADD_STORE', addStore);
  // yield takeLatest('DELETE_STORE', deleteStore);
}

export default storeSaga;
