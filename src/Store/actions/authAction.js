import {
    GET_ERRORS,
    CLEAR_ERRORS,
    LOGIN_SUCCESS,
    LOGOUT,
    GET_CURR_USER,
    REGISTER_REQUEST,
    AUTH_LOADING,
    TRAINEE_CREATE_SUCCESS,
    TRAINEE_UPDATE_SUCCESS,
    TRAINEE_DELETE,
    UPDATE_AVATAR,
    UPDATE_USER,
    CLEAR_AUTH,
    AUTH_PROFILE
} from './types';
import { userService } from '../../servises';
import { alertActions } from './alertActions';
import { clearLogoutMeetings } from './meetingActions';
import { clearLogoutProfile } from './profileAction';

export const loginUser = userData => dispatch => {
    dispatch(setLoading(true));
    userService.login(userData)
        .then(
            user => {
                dispatch(success(user));
                dispatch(clear());
            },
            error => {
                dispatch(setLoading(false));
                dispatch(failure(error));
            }
        );
    function success(user) { return { type: LOGIN_SUCCESS, payload: user } }
}
export const setCurrentUser = user => { return { type: LOGIN_SUCCESS, payload: user } }
export const currentUser = () => { return { type: GET_CURR_USER } }

export const logoutUser = () => dispatch => {
    userService.logout();
    dispatch(clearLogoutAuth());
    dispatch(clearLogoutMeetings());
    dispatch(clearLogoutProfile());
};

export const registerUser = userData => dispatch => {
    dispatch(setLoading(true));
    userService.register(userData)
        .then(
            user => {
                dispatch(success());
                dispatch(alertActions.success('Registration successful'));
                dispatch(clear());
            },
            error => {
                dispatch(setLoading(false));
                dispatch(failure(error));
            }
        );
    function success() { return { type: REGISTER_REQUEST } }
}

export const updateUser = userData => dispatch => {
    dispatch(setLoading(true));
    console.log('====================================');
    console.log(userData);
    console.log('====================================');
    userService.updateUser(userData)
        .then(
            user => {
                dispatch(success(userData.user));
                dispatch(clear());
            },
            error => {
                dispatch(setLoading(false));
                dispatch(failure(error));
            }
        );
    function success() { return { type: UPDATE_USER, payload: userData } }
}

export const createTrainee = userData => dispatch => {
    dispatch(setLoading(true));
    userService.createTraineeUser(userData)
        .then(
            user => {
                dispatch(success(user));
                dispatch(setLoading(false));
                dispatch(alertActions.success('Trainee user created successfuly'));
                dispatch(clear());
            },
            error => {
                dispatch(setLoading(false));
                dispatch(failure(error));
            }
        );
    //upadte my trinees in the profils state and not in user state
    function success(user) { return { type: TRAINEE_CREATE_SUCCESS, payload: user } }
}

export const updateTraineeUser = (id, userData) => dispatch => {
    dispatch(setLoading(true));
    userService.updateTraineeUser(id, userData)
        .then(
            user => {
                dispatch(success());
                dispatch(clear());
            },
            error => {
                dispatch(setLoading(false));
                dispatch(failure(error));
            }
        );
    function success() { return { type: TRAINEE_UPDATE_SUCCESS } }
}

export const deletTrainee = (id) => dispatch => {
    dispatch(setLoading(true));
    userService.deletTrainee(id)
        .then(
            user => {
                dispatch(success());
                dispatch(alertActions.success('Trainee user deleted successfuly'));
                dispatch(clear());
            },
            error => {
                dispatch(setLoading(false));
                dispatch(failure(error));
            }
        );
    function success() { return { type: TRAINEE_DELETE } }
}

export const updateAvatarPic = (data) => dispatch => {
    dispatch(setLoading(true));
    userService.updateAvatarPic(data)
        .then(
            user => {
                console.log('user', user);
                dispatch(success(user));
            },
            error => {
                console.log('error', error.response);
                dispatch(setLoading(false));
                dispatch(failure(error));
            }
        );
    function success(user) { return { type: UPDATE_AVATAR, payload: user } }
}

function failure(error) { return { type: GET_ERRORS, payload: error.error } }
function clear(eror) { return { type: CLEAR_ERRORS } }

export const clearLogoutAuth = () => { return { type: CLEAR_AUTH }; };

export function seccesProfile(profile) { return { type: AUTH_PROFILE, payload: profile }; }

export const setLoading = (val) => {
    return {
        type: AUTH_LOADING,
        payload: val
    };
};