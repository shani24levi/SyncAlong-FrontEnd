import axios from 'axios';
import setAuthToken from '../Utils/setAuthToken';
import { URL } from '../Utils/globalVaribals';
import jwt_decode from 'jwt-decode';
const USERS = 'api/users';

const login = userData => {
    return axios
        .post(`${URL}/${USERS}/login`, userData)
        .then(user => {
            console.log('user axis login', user.data);
            // Save to localStorage
            const { token } = user.data;
            // Set token to ls
            // if (localStorage.getItem('user'))
            //     localStorage.removeItem('user');
            localStorage.setItem('user', token);
            // Set token to Auth header
            setAuthToken(token);
            // Decode token to get user data
            const decoded = jwt_decode(token);
            console.log(decoded);
            return decoded;
        })
        .catch(err => {
            console.log('eeee', err);
            return Promise.reject(err.response.data);
        })
}

const logout = () => {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
    // Remove auth header for future requests
    setAuthToken(false);
}

const register = userData => {
    return axios
        .post(`${URL}/${USERS}`, userData)
        .then(user => { console.log(user); return user })
        .catch(err => {
            return Promise.reject(err.response.data);
        })
}


export const userService = {
    login,
    logout,
    register,
    // getAll,
    // getById,
    // update,
    // delete: _delete
};