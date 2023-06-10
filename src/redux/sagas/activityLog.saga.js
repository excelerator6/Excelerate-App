import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* logActivity(action) {
    try {
        console.log("Successfully received ativity in activityLog saga", action.payload);

        const res = axios.put('/api/')
    } catch (error) {
        console.log("Error communicating with server, couldn't log Activity", error)
    }
}


function* activitySaga() {
    yield takeLatest('LOG_ACTIVITY', logActivity)
}
export default activitySaga;