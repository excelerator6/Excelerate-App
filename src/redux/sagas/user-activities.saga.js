import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchUserActivities() {
  try {
    const { data: userActivities } = yield axios.get('/api/user-activities');
    yield put({ type: 'SET_USER_ACTIVITIES', payload: userActivities })
  } catch (error) {
    console.log('Error within fetchUserActivities:', error);
  }
}

function* fetchUserActivityLog() {
  try {
    const { data: userActivityLog } = yield axios.get('/api/user-activities/userActivityLog');
    yield put({ type: 'SET_USER_ACTIVITY_LOG', payload: userActivityLog })
  } catch (error) {
    console.log('Error within fetch_User_Activity_Log:', error);
  }
}


function* fetchUserTotalXpPoints() {
  try {
    const { data: userTotalXpPoints } = yield axios.get('/api/user-activities/totalXpSkillsPoints');
    yield put({ type: 'SET_USER_TOTAL_XP_POINTS', payload: userTotalXpPoints })
  } catch (error) {
    console.log('Error within fetch_User_TOTAL_XP_POINTS:', error);
  }
}


function* userActivitiesSaga() {
  yield takeLatest('FETCH_USER_ACTIVITIES', fetchUserActivities);
  yield takeLatest('FETCH_USER_ACTIVITY_LOG', fetchUserActivityLog);
  yield takeLatest('FETCH_USER_TOTAL_XP_POINTS', fetchUserTotalXpPoints);

}

export default userActivitiesSaga;