import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_ITEMS_FOR_LIST" actions
function* fetchItemsForList(action) {
  try {
    // axios asynch call to retrieve items from the database
    const response = yield axios.get('api/item', {params: {id: action.payload}});    
    // call to move those into the redux state
    yield put({ type: 'SET_ITEMS_FOR_LIST', payload: response.data });
  } catch (error) {
    console.log('Items get request failed', error);
  }
}

function* itemSaga() {
  yield takeLatest('FETCH_ITEMS_FOR_LIST', fetchItemsForList);
}

export default itemSaga;
