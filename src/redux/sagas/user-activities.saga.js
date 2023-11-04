import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchUserActivities() {
  
  try { 
    console.log("In fetchUserActivities function in user-activities.saga");
    const { data: userActivities } = yield axios.get('/api/user-activities');
    yield put({ type: 'SET_USER_ACTIVITIES', payload: userActivities })
  } catch (error) {
    console.log('Error within fetchUserActivities:', error);
  }
}


function* fetchUserActivityLog() {
  try {
    console.log("In fetchUserActivitiesLog function in user-activities.saga");
    const { data: userActivityLog } = yield axios.get('/api/user-activities/userActivityLog');
    yield put({ type: 'SET_USER_ACTIVITY_LOG', payload: userActivityLog })
  } catch (error) {
    console.log('Error within fetch_User_Activity_Log:', error);
  }
}


function* fetchUserTotalXpPoints() {
  try {
    console.log("In fetchUserTotalXpPoints function in user-activities.saga");
    const { data: userTotalXpPoints } = yield axios.get('/api/user-activities/totalXpSkillsPoints');
    yield put({ type: 'SET_USER_TOTAL_XP_POINTS', payload: userTotalXpPoints })
  } catch (error) {
    console.log('Error within fetch_User_TOTAL_XP_POINTS:', error);
  }
}

function* deleteLogs(action){
  try {
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