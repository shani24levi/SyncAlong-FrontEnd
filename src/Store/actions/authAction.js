import {
    GET_ERRORS,
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
} from './types';
import { userService } from '../../servises';
import { alertActions } from './alertActions';

export const loginUser = userData => dispatch => {
    dispatch(setLoading(true));
    userService.login(userData)
        .then(
            user => {
                dispatch(success(user));
                //redirect('/home')
            },
            error => {
                dispatch(setLoading(false));
                dispatch(failure(error));
            }
        );
    function success(user) { return { type: LOGIN_SUCCESS, payload: user } }
}

export const setCurrentUser = user => { return { type: LOGIN_SUCCESS, payload: user } }
export const setLogoutCurrentUser = user => { return { type: LOGOUT } }
export const currentUser = () => { return { type: GET_CURR_USER } }

export const logoutUser = () => dispatch => {
    userService.logout();
    dispatch(setLogoutCurrentUser())
};

export const registerUser = userData => dispatch => {
    dispatch(setLoading(true));
    console.log(userData);
    userService.register(userData)
        .then(
            user => {
                dispatch(success());
                dispatch(alertActions.success('Registration successful'));
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
    console.log('userData', userData);
    userService.updateUser(userData)
        .then(
            user => {
                dispatch(success(userData));
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
                console.log('user retuen from db', user);
                dispatch(success(user));
                dispatch(setLoading(false));
                dispatch(alertActions.success('Trainee user created successfuly'));
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
                dispatch(success());
                dispatch(currentUser());
            },
            error => {
                dispatch(setLoading(false));
                dispatch(failure(error));
            }
        );
    function success() { return { type: UPDATE_AVATAR } }
}

function failure(error) { return { type: GET_ERRORS, payload: error.error } }

export const setLoading = (val) => {
    return {
        type: AUTH_LOADING,
        payload: val
    };
};