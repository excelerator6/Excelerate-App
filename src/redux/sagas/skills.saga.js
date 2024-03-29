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

function* deleteSkill(action) {
    try {
        // need to check whether the skill to delete is an enterprise skill or a user-created skill
        let skillID = Object.values(action.payload)[0];
        // then have two seperate routes, one for each possibility.
        if(Object.keys(action.payload)[0] == 'enterprise_id'){
            const res = yield axios.post(`/api/skills/deleteEnterpriseSkill`, action.payload);
        } else if (Object.keys(action.payload)[0] == 'user_skill_id') {
            const res = yield axios.delete(`/api/skills/deleteUserSkill/${skillID}`);
        }
    } catch (error) {
        console.log('Error communicating with server to delete skill', error)
    }
}

function* skillsSaga() {
    yield takeLatest('GET_SKILLS_LIST', getSkills);
    yield takeLatest('LOG_NEW_SKILL', skillToAdd);
    yield takeLatest('DELETE_SKILL', deleteSkill);

}
export default skillsSaga;