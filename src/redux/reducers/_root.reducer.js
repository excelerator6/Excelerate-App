import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import activities from './activities.reducer';
import skills from './skills.reducer'
import userActivities from './user-activities.reducer';
import achievements from './achievements.reducer';
import xpPoints from './xpPoints.reducer'

// rootReducer is the primary reducer for the entire application
// It bundles up all of the other reducers so the application can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  activities, // the list of activities the user can pick from (different than the SKILLS they are trying level)
  skills, //list of the skills the user will be leveling up.
  userActivities, // The list of activities/events associated with the user
  achievements, // The list of achievements (counts of different activities) associated with the user
  xpPoints, //Total overall skill points for each user 
});

export default rootReducer;
