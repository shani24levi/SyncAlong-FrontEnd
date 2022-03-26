import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import alertReducer from './alertReducer';
import profileReducer from './profileReducer';
import meetingReducer from './meetingReducer';
import syncReducer from './syncReducer';

export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    alert: alertReducer,
    profile: profileReducer,
    meetings: meetingReducer,
    syncs: syncReducer
});