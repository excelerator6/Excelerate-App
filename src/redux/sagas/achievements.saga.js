import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchAchievements() {
  try {
    const { data: achievementsData } = yield axios.get('/api/achievements');
    yield put({ type: 'SET_ALL_ACHIEVEMENTS', payload: achievementsData.allAchievements })
    yield put({ type: 'SET_USER_ACHIEVEMENTS', payload: achievementsData.userAchievements})
  } catch (error) {
    console.log('Error within fetchAchievements:', error);
  }
}


function* achievementsSaga() {
  yield takeLatest('FETCH_ACHIEVEMENTS', fetchAchievements)
}

export default achievementsSaga;