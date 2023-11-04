import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchUserActivities() {
  let time = Date.now();
  console.log("Trying to test the routes, in fetchUserActivities saga user-activities");
  
  try {
    const { data: userActivities } = yield axios.get('/api/user-activities');
    yield put({ type: 'SET_USER_ACTIVITIES', payload: userActivities })
    let end = (Date.now() - time);
    console.log("Here's the total time it took in user-activities saga", end);
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

function* deleteLogs(action){
  try {
      console.log("Here's our log ids to delete:", action.payload)
      const res = yield axios.delete(`/api/user-activities/deleteLogs/${action.payload}`)
      yield put({type:'FETCH_USER_ACTIVITIES'})
  } catch (error) {
      console.log("Error within deleteLogs saga:", error)
  }
}


function* userActivitiesSaga() {
  yield takeLatest('FETCH_USER_ACTIVITIES', fetchUserActivities);
  yield takeLatest('FETCH_USER_ACTIVITY_LOG', fetchUserActivityLog);
  yield takeLatest('FETCH_USER_TOTAL_XP_POINTS', fetchUserTotalXpPoints);
  yield takeLatest('DELETE_LOGS', deleteLogs);

}

export default userActivitiesSaga;