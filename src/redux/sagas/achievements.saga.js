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
    const { data: newestActivity } = yield axios.get('/api/user-activities/newestActivity')
    console.log('newestActivity inside checkThenPostNewAchievements:', newestActivity);
    const activityId = newestActivity.activityId
    switch (activityId) {
      // If the newest acitivity was one of the Watch a video options
      case 21: // Watch a Video(+)
      case 25: // Watch a Video(++)
      case 32: // Watch a Video(+++)
        const {data: checkVideoAchievements} = yield axios.post('/api/achievements/videosWatched');
        break;
      // If the newest activity was Finishing a Podcast
      case 17: // Finished Podcast
        console.log('Finished a podcast');
        const {data: checkPodcastAchievements} = yield axios.post('/api/achievements/podcastsFinished');
        break;
      // If the newest activity was finishing an audiobook
      case 35: // Finish an Audiobook
        console.log('Finished an audiobook');
        const checkAudiobookAchievements = yield axios.post('/api/achievements/audiobooksRead');
        break;
      // If the newest activity was one of the finish a book options
      case 36: // Finish a Book (Pages < 100)
      case 37: // Finsih a Book (Pages > 100)
        console.log('Finished reading a book');
        const checkBookAchievments = yield axios.post('/api/achievements/booksRead');
        break;
      // If the newest activity was finishing a book summary
      case 23: // Complete Book Summary
        const checkSummaryAchievments = yield axios.post('/api/achievements/bookSummaries');
        console.log('Finished reading a book summary');
        break;
      // If the newest activity was finishing an article
      case 3: // Read an Article
        console.log('Finished reading an article');
        const checkArticleAchievements = yield axios.post('/api/achievements/articlesRead');
        break;
      // If the newest activity was completing a course
      case 34: // Finish a Course
        console.log('Completed a course');
        const checkCourseAchievements = yield axios.post('/api/achievements/coursesCompleted');
      default:
        break;
    }
    const checkSkillLevelAchievements = yield axios.post('/api/achievements/skillLevels');
    // const totalXpAchievements = yield axios.post('/api/achievements/totalXp');
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