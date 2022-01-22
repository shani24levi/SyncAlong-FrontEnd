import axios from 'axios';
import { GET_ERRORS, LOGIN_SUCCESS, GET_CURR_USER, REGRISTER_SUCCESS } from './types';
import { userService } from '../../servises';
import { redirect } from '../../helpers';
import { alertActions } from './alertActions';


export const loginUser = userData => {
    return dispatch => {
        userService.login(userData)
            .then(
                user => {
                    dispatch(success(user));
                    redirect('/');
                },
                error => {
                    console.log('eerrr', error);
                    dispatch(failure(error));
                    // dispatch(alertActions.error(error.toString()));
                }
            );
        function success(user) { return { type: LOGIN_SUCCESS, payload: user } }
    }
}

export const setCurrentUser = user => { return { type: LOGIN_SUCCESS, payload: user } }
export const currentUser = () => { return { type: GET_CURR_USER } }

export const registerUser = userData => {
    return dispatch => {
        userService.register(userData)
            .then(
                user => {
                    dispatch(alertActions.success('Registration successful'));
                    redirect('/auth/login')
                },
                error => {
                    console.log('eerrr', error);
                    dispatch(failure(error));
                    // dispatch(alertActions.error(error.toString()));
                }
            )
    }
}

function failure(error) { return { type: GET_ERRORS, payload: error.error } }
