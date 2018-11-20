import axios from 'axios';
import { put, call, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_LIST" actions
function* fetchList() {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    // the config includes credentials which
    // allow the server session to recognize the user
    // If a user is logged in, this will return the 
    // list of items in the shopping_list on the DB
    const response = yield axios.get('api/list', config);
    console.log('response from list:', response);
    
    // now that the session has given us a user object
    // with an id and username set the client-side user object to let
    // the client-side code know the user is logged in
    yield put({ type: 'SET_LIST', payload: response.data });
  } catch (error) {
    console.log('User get request failed', error);
  }
}

// worker Saga: will be fired on "FOUND_ITEM" actions
function* foundItem(action) {
  console.log('in foundItem', action.payload);
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };
    // axios asynch call to add plant to server
    yield call(axios.put, '/api/list/found', 
              {id: action.payload.id, found: !action.payload.found});
    yield put( { type: 'FETCH_LIST' } );
  } 
  catch (error) {
    console.log('User put request failed', error);
  }
}

function* listSaga() {
  yield takeLatest('FETCH_LIST', fetchList);
  yield takeLatest('FOUND_ITEM', foundItem);
}

export default listSaga;
