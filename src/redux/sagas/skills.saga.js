import { put, takeLatest } from 'redux-saga/effects';
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

function* skillToAdd(action) {
    try {
        const res = yield axios.post('/api/skills/LogNewSkill', action.payload);
    } catch (error) {
        console.log("Error communicating with server, couldn't log new Skill", error)
    }
}

function* skillsSaga() {
    yield takeLatest('GET_SKILLS_LIST', getSkills);
    yield takeLatest('LOG_NEW_SKILL', skillToAdd);

}
export default skillsSaga;