import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* logActivity(action) {
    try {
        console.log("Successfully received ativity in activityLog saga", action.payload);

        const res = yield axios.post('/api/activity/log', action.payload);
        console.log('Successfully sent activity log to the server', res);
        yield put({type: 'FETCH_USER_ACTIVITIES'})
    } catch (error) {
        console.log("Error communicating with server, couldn't log Activity", error)
    }
}

function* getActivities(){
    try {
        // get the list of activites from the DB
        const res = yield axios.get('/api/activity/getList');

        // store those activites in a reducer
        yield put({type: "REDUCER/STORE_ACTIVITES_LIST", payload: res.data});

    } catch (error) {
        console.log("Error communicating with the server:", error);
    }
}


function* activitySaga() {
    yield takeLatest('LOG_ACTIVITY', logActivity)
    yield takeLatest('GET_ACTIVITY_LIST', getActivities)
}
export default activitySaga;