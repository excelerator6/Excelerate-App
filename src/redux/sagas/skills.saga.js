import {put, takeLatest} from 'redux-saga/effects';
import axios from 'axios';

function* getSkills() {
    try {
        console.log("in skills.saga");
        const res = yield axios.get('/api/skills/getSkills');

        console.log('Got our skills:', res.data);
    } catch (error) {
        console.log("Error communicating with server:", error);
    }
}

function* skillsSaga() {
    yield takeLatest('GET_SKILLS_LIST', getSkills)
}
export default skillsSaga;