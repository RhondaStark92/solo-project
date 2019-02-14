import axios from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';

// worker SAGA: will be fired on 'ADD_ITEM' actions
// user entered a new item
function* addItem(action) {
  try {
      // axios asynch call to add item on database
      yield call(axios.post, '/api/item', action.payload);
      // will need to make a call to update the list of item
      yield put( { type: 'FETCH_ITEMS_FOR_LIST' } );
  }
  catch (error) {
      console.log('error with add item post request');
  }
}

// worker SAGA: will be fired on 'UPDATE_ITEM' actions
function* updateItem(action) {
  console.log('in updateItem saga', action.payload)
  try {
      // axios asynch call to add category on database
      yield call(axios.put, '/api/item', action.payload);
      // will need to make a call to update the list of category
      yield put( { type: 'FETCH_ITEMS_FOR_LIST' } );
  }
  catch (error) {
      console.log('error with update category post request');
  }
}

// worker Saga: will be fired on "FETCH_ITEMS" actions
function* fetchItems(action) {
  console.log('in fetch item Saga', action.payload);
  
  try {
    const response = yield axios.get('api/item');
    console.log('response from item:', response);
    
    // now that the session has given us a user object
    // with an id and username set the client-side user object to let
    // the client-side code know the user is logged in
    yield put({ type: 'SET_ITEMS', payload: response.data });
  } catch (error) {
    console.log('Item get request failed', error);
  }
}

// worker Saga: will be fired on "FETCH_ITEMS_FOR_LIST" actions
function* fetchItemsForList(action) {
  try {
    console.log('fetch items for list: ', action.payload)
    // axios asynch call to retrieve items from the database
    const response = yield axios.get('api/item/list', {params: {id: action.payload}});    
    // call to move those into the redux state
    yield put({ type: 'SET_ITEMS_FOR_LIST', payload: response.data });
  } catch (error) {
    console.log('Items get request failed', error);
  }
}

// worker SAGA: will be fired on 'DELETE_ITEM' actions
function* deleteItem(action) {
  try {
    //axios call to remove selected category
    yield call(axios.delete, '/api/item', {params: {id: action.payload}});
    // will need to make a call to update the list of catgories
    yield put( { type: 'FETCH_ITEMS_FOR_LIST' } );
  }
  catch (error) {
    console.log('error with delete request to /api/item');
  } 
}

function* itemSaga() {
  yield takeLatest('FETCH_ITEMS_FOR_LIST', fetchItemsForList);
  yield takeLatest('ADD_ITEM', addItem);
  yield takeLatest('FETCH_ITEMS', fetchItems);
  yield takeLatest('DELETE_ITEM', deleteItem);
  yield takeLatest('UPDATE_ITEM', updateItem);
}

export default itemSaga;
