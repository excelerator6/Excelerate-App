import {put, takeLatest} from 'redux-saga/effects';
import axios from 'axios';

function* getSkills() {
    try {

        const res = yield axios.get('/api/skills/getSkills');

        yield put({
            type: 'SET_SKILLS_LIST',
            payload: res.data
        })

    } catch (error) {
        console.log("Error communicating with server:", error);
    }
}

function* skillsSaga() {
    yield takeLatest('GET_SKILLS_LIST', getSkills)
}
export default skillsSaga;