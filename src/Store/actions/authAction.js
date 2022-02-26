import axios from 'axios';
import { GET_ERRORS, LOGIN_SUCCESS, LOGOUT, GET_CURR_USER, REGISTER_REQUEST, AUTH_LOADING } from './types';
import { userService } from '../../servises';
import { redirect } from '../../helpers';
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
    userService.register(userData)
        .then(
            user => {
                dispatch(success());
                dispatch(alertActions.success('Registration successful'));
                //redirect('/auth/login')
            },
            error => {
                dispatch(setLoading(false));
                dispatch(failure(error));
                // dispatch(alertActions.error(error.toString()));
            }
        );
    function success() { return { type: REGISTER_REQUEST } }
}

function failure(error) { return { type: GET_ERRORS, payload: error.error } }

export const setLoading = (val) => {
    return {
        type: AUTH_LOADING,
        payload: val
    };
};