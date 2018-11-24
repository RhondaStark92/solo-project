import axios from 'axios';
import { put, call, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_LIST" actions
function* fetchList(action) {
  console.log('in fetchSaga', action.payload);
  
  try {
    // If a user is logged in, this will return the 
    // list of items in the shopping_list on the DB
    const response = yield axios.get('api/list', {params: {id: action.payload}});
    // Set the list in the redux store
    yield put({ type: 'SET_LIST', payload: response.data });
  } catch (error) {
    console.log('User get request failed', error);
  }
}

// worker Saga: will be fired on "FOUND_ITEM" actions
function* foundItem(action) {
  console.log('in foundItem', action.payload);
  try {
    // const config = {
    //   headers: { 'Content-Type': 'application/json' },
    //   withCredentials: true,
    // };
    // axios asynch call to add plant to server
    yield call(axios.put, '/api/list/found', 
              {id: action.payload.item.id, found: !action.payload.item.found});
    yield put( { type: 'FETCH_LIST', payload: action.payload.store_id } );
  } 
  catch (error) {
    console.log('User put request failed', error);
  }
}

function* deleteListItem(action) {
  console.log('in delete saga', action.payload);
  try {
    //axios call to remove project
    yield call(axios.delete, '/api/list', {params: {id: action.payload}});
    yield put( { type: 'FETCH_ITEMS_FOR_LIST' } );
  }
  catch (error) {
    console.log('error with delete request to /api/list');
    
  } 
}

// Saga to retrieve the projects from the server
// this is the ASYNCH call to the server/DB
// and then the dispatch to the reducer
function* addItemToList(action) {
  console.log('in post saga for add item to list', action.payload);
  try {
      // axios asynch call to add project to server
      yield call(axios.post, '/api/list', action.payload);
      // will need to make a call to update the list
      yield put( { type: 'FETCH_ITEMS_FOR_LIST' } );
  }
  catch (error) {
      console.log('error with add project post request');
  }
}

function* listSaga() {
  yield takeLatest('FETCH_LIST', fetchList);
  yield takeLatest('FOUND_ITEM', foundItem);
  yield takeLatest('DELETE_LIST_ITEM', deleteListItem);
  yield takeLatest('ADD_ITEM_TO_LIST', addItemToList);
}

export default listSaga;
