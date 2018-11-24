import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

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

function* storeSaga() {
  yield takeLatest('FETCH_STORES', fetchStores);
}

export default storeSaga;
