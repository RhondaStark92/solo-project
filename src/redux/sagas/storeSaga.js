import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_STORES" actions
function* fetchStores(action) {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    // the config includes credentials which
    // allow the server session to recognize the user
    // If a user is logged in, this will return the 
    // list of items in the shopping_list on the DB
    const response = yield axios.get('api/store', config);
    console.log('response from stores:', response);
    
    // now that the session has given us a user object
    // with an id and username set the client-side user object to let
    // the client-side code know the user is logged in
    yield put({ type: 'SET_STORES', payload: response.data });
  } catch (error) {
    console.log('User get request failed', error);
  }
}

function* storeSaga() {
  yield takeLatest('FETCH_STORES', fetchStores);
}

export default storeSaga;
