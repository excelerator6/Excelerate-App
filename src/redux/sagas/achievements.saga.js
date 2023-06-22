import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { useSelector } from 'react-redux';



function* fetchAchievements() {
  try {
    const { data: achievementsData } = yield axios.get('/api/achievements');
    yield put({ type: 'SET_ALL_ACHIEVEMENTS', payload: achievementsData.allAchievements })
    yield put({ type: 'SET_USER_ACHIEVEMENTS', payload: achievementsData.userAchievements })
  } catch ( error ) {
    console.log( 'Error within fetchAchievements:', error );
  }
}

function* checkThenPostNewAchievements() {
  try {
    const response = yield axios.post( '/api/achievements' );
    console.log('response inside checkThenPostNewAchievements:', response);
    yield put({ type: 'FETCH_ACHIEVEMENTS'})
  } catch ( error ) {
    console.log( 'Error within checkThenPostNewAchievements:', error );
  }
}


function* achievementsSaga() {
  yield takeLatest('FETCH_ACHIEVEMENTS', fetchAchievements)
  yield takeLatest('CHECK_FOR_THEN_POST_NEW_ACHIEVEMENTS', checkThenPostNewAchievements)
}

export default achievementsSaga;