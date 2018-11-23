import axios from 'axios';
import { put, call, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_ITEM" actions
function* fetchItemsForList(action) {
  console.log('in fetchItemsForList', action.payload);
  
  try {
    // const config = {
    //   headers: { 'Content-Type': 'application/json' },
    //   withCredentials: true,
    // };

    // the config includes credentials which
    // allow the server session to recognize the user
    // If a user is logged in, this will return the 
    // list of items in the shopping_list on the DB
    const response = yield axios.get('api/item', {params: {id: action.payload}});
    console.log('response from item:', response);
    
    // now that the session has given us a user object
    // with an id and username set the client-side user object to let
    // the client-side code know the user is logged in
    yield put({ type: 'SET_ITEMS_FOR_LIST', payload: response.data });
  } catch (error) {
    console.log('Items get request failed', error);
  }
}

// // worker Saga: will be fired on "FOUND_ITEM" actions
// function* foundItem(action) {
//   console.log('in foundItem', action.payload);
//   try {
//     // const config = {
//     //   headers: { 'Content-Type': 'application/json' },
//     //   withCredentials: true,
//     // };
//     // axios asynch call to add plant to server
//     yield call(axios.put, '/api/list/found', 
//               {id: action.payload.item.id, found: !action.payload.item.found});
//     yield put( { type: 'FETCH_LIST', payload: action.payload.store_id } );
//   } 
//   catch (error) {
//     console.log('User put request failed', error);
//   }
// }

function* itemSaga() {
  yield takeLatest('FETCH_ITEMS_FOR_LIST', fetchItemsForList);
  // yield takeLatest('FOUND_ITEM', foundItem);
}

export default itemSaga;
