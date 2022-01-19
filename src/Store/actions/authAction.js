import axios from 'axios';
import { FETCH_POSTS, NEW_POST, GET_ERRORS, LOGIN_SUCCESS } from './types';
import { userService } from '../../servises';
import { redirect } from '../../helpers';


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

function failure(error) { return { type: GET_ERRORS, payload: error.error } }

export const setCurrentUser = user => {
    return { type: LOGIN_SUCCESS, payload: user }
}
export const fetchPosts = () => dispatch => {
    console.log('fatching action');
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then(res => res.json())
        .then(posts =>
            dispatch({
                type: FETCH_POSTS,
                payload: posts
            })
        );
};

export const createPost = postData => dispatch => {
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(postData)
    })
        .then(res => res.json())
        .then(post =>
            dispatch({
                type: NEW_POST,
                payload: post
            })
        );
};