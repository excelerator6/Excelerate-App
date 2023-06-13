import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchUserActivities() {
  try {
    const {data: userActivities} = yield axios.get('/api/user-activities');
    yield put({type: 'SET_USER_ACTIVITIES', payload: userActivities})
  } catch (error) {
    console.log('Error within fetchUserActivities:', error);
  }
}

function* userActivitiesSaga() {
  yield takeLatest('FETCH_USER_ACTIVITIES', fetchUserActivities)
}

export default userActivitiesSaga;