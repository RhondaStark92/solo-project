import axios from 'axios';
import { put, call, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_STORES" actions
function* fetchStores(action) {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };
    // axios asynch call to retrieve the stores from the database
    const response = yield axios.get('api/store', config);
    // send response to the redux store
    yield put({ type: 'SET_STORES', payload: response.data });
  } catch (error) {
    console.log('User get request failed', error);
  }
}

// worker SAGA: will be fired on 'ADD_ITEM_TO_LIST' actions
function* addStore(action) {
  try {
      // axios asynch call to add store on database
      yield call(axios.post, '/api/store', action.payload);
      // will need to make a call to update the list of stores
      yield put( { type: 'FETCH_STORES' } );
  }
  catch (error) {
      console.log('error with add list post request');
  }
}

// worker SAGA: will be fired on 'DELETE_LIST_ITEM' actions
function* deleteStore(action) {
  try {
    //axios call to remove selected item from shopping list
    yield call(axios.delete, '/api/store', {params: {id: action.payload}});
    // will need to make a call to update the list of items
    yield put( { type: 'FETCH_STORES' } );
  }
  catch (error) {
    console.log('error with delete request to /api/store');
  } 
}

function* storeSaga() {
  yield takeLatest('FETCH_STORES', fetchStores);
  yield takeLatest('ADD_STORE', addStore);
  yield takeLatest('DELETE_STORE', deleteStore);
}

export default storeSaga;
