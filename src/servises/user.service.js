import axios from 'axios';
import setAuthToken from '../Utils/setAuthToken';
import { URL } from '../Utils/globalVaribals';
import jwt_decode from 'jwt-decode';
const USERS = 'api/users';

const login = (userData) => {
    console.log('userData', userData);
    return axios
        .post(`${URL}/${USERS}/login`, userData)
        .then(user => {
            console.log('user axis login', user.data);
            // Save to localStorage
            const { token } = user.data;
            // Set token to ls
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

const register = (userData) => {
    axios
        .post(`${URL}/${USERS}`, userData)
        .then(res => console.log('logged')) //history.push('/login')  chang to return element and push in the action
        .catch(err => {
            return Promise.reject(err.response.data);
        })
}

const okToken = (token) => {
    // chack valid token for user 
    axios
        .get(`${URL}/${USERS}/auth`, token)
        .then(res => { return res })
        .catch(err => {
            // Remove auth header for future requests
            setAuthToken(false);
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