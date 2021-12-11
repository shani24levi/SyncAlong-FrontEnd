import axios from 'axios';
import { FETCH_POSTS, NEW_POST, GET_ERRORS } from './types';
import setAuthToken from '../../Utils/setAuthToken';
import { URL } from '../../Utils/globalVaribals';
const USERS = 'api/users';

export const loginUser = userData => dispatch => {
    axios
        .post(`${URL}/${USERS}/login`, userData)
        .then(res => {
            console.log(res.data);
            const cookieData = document.cookie;
            console.log(cookieData)
        })

        // httpService.post(USERS + '/login', userData)
        //     .then(res => {
        //         console.log(res);
        //     })
        // Save to localStorage
        // const { token } = res.data;
        // // Set token to ls
        // localStorage.setItem('jwtToken', token);
        // // Set token to Auth header
        // setAuthToken(token);
        // // Decode token to get user data
        // const decoded = jwt_decode(token);
        // console.log(decoded);
        // // Set current user
        // dispatch(setCurrentUser(decoded));
        .catch(err => {
            console.log('ERR', err.response.data);
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data

            });
        })
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