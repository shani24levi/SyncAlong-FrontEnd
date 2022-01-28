import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import alertReducer from './alertReducer';

export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    alert: alertReducer,
});