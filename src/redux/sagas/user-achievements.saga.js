import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchAchievements() {
  try {
    const { data: userAchievements } = yield axios.get('/api/achievements');
    yield put({ type: 'SET_USER_ACHIEVEMENTS', payload: userAchievements })
  } catch (error) {
    console.log('Error within fetchAchievements:', error);
  }
}

function* userAchievementsSaga() {
  yield takeLatest('FETCH_ACHIEVEMENTS_COUNT', fetchAchievements);
}

export default userAchievementsSaga;