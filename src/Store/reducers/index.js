import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import alertReducer from './alertReducer';
import profileReducer from './profileReducer';
import meetingReducer from './meetingReducer';
import syncReducer from './syncReducer';
import recordingReducer from './recordingReducer';
import syncperformanceReducer from './syncperformanceReducer';

export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    alert: alertReducer,
    profile: profileReducer,
    meetings: meetingReducer,
    syncs: syncReducer,
    recording: recordingReducer,
    syncperformance: syncperformanceReducer
});