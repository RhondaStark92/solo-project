import axios from 'axios';
import { put, call, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_LIST" actions
function* fetchList(action) {
  console.log('in fetchSaga', action.payload);
  
  try {
    // axios asynch call to retrieve the shopping list items from the database
    const response = yield axios.get('api/list', {params: {id: action.payload}});
    // Set the list in the redux store
    yield put({ type: 'SET_LIST', payload: response.data });
  } catch (error) {
    console.log('User get request failed', error);
  }
}

// worker SAGA: will be fired on 'DELETE_LIST_ITEM' actions
function* clearList(action) {
  try {
    console.log('in clear list');
    
    //axios call to remove selected item from shopping list
    yield call(axios.delete, '/api/list/clear');
    // will need to make a call to update the list of items
    // yield put( { type: 'FETCH_LIST' } );
  }
  catch (error) {
    console.log('error with delete request to /api/list');
    
  } 
}

// worker Saga: will be fired on "FOUND_ITEM" actions
function* foundItem(action) {
  console.log('in foundItem', action.payload);
  try {
    // axios asynch call to update found flag on database
    yield call(axios.put, '/api/list/found', 
              {id: action.payload.item.id, found: !action.payload.item.found});
    // will need to make a call to update the list 
    yield put( { type: 'FETCH_LIST', payload: action.payload.store_id } );
  } 
  catch (error) {
    console.log('User put request failed', error);
  }
}

// worker SAGA: will be fired on 'UPDATE_QUANTITY' actions
function* updateQuantity(action) {
  console.log('in updateQuantity', action.payload);
  try {
    // axios asynch call to update quantity on database
    yield call(axios.put, '/api/list', action.payload);
    // will need to make a call to update the list of items
    yield put( { type: 'FETCH_ITEMS_FOR_LIST' } );
  } 
  catch (error) {
    console.log('Quantity put request failed', error);
  }
}

// worker SAGA: will be fired on 'DELETE_LIST_ITEM' actions
function* deleteListItem(action) {
  try {
    //axios call to remove selected item from shopping list
    yield call(axios.delete, '/api/list', {params: {id: action.payload}});
    // will need to make a call to update the list of items
    yield put( { type: 'FETCH_ITEMS_FOR_LIST' } );
  }
  catch (error) {
    console.log('error with delete request to /api/list');
    
  } 
}

// worker SAGA: will be fired on 'ADD_ITEM_TO_LIST' actions
function* addItemToList(action) {
  try {
      // axios asynch call to add item to shopping list on database
      yield call(axios.post, '/api/list', action.payload);
      // will need to make a call to update the list of items
      yield put( { type: 'FETCH_ITEMS_FOR_LIST' } );
  }
  catch (error) {
      console.log('error with add list post request');
  }
}

function* listSaga() {
  yield takeLatest('FETCH_LIST', fetchList);
  yield takeLatest('CLEAR_LIST', clearList);
  yield takeLatest('FOUND_ITEM', foundItem);
  yield takeLatest('DELETE_LIST_ITEM', deleteListItem);
  yield takeLatest('ADD_ITEM_TO_LIST', addItemToList);
  yield takeLatest('UPDATE_QUANTITY', updateQuantity);
}

export default listSaga;
