import axios from 'axios';
import setAuthToken from '../Utils/setAuthToken';
import { URL } from '../Utils/globalVaribals';
import jwt_decode from 'jwt-decode';
const USERS = 'api/users';

const login = userData => {
    return axios
        .post(`${URL}/${USERS}/login`, userData)
        .then(user => {
            // Save to localStorage
            const { token } = user.data;
            // Set token to ls
            localStorage.setItem('user', token);
            // Set token to Auth header
            setAuthToken(token);
            // Decode token to get user data
            const decoded = jwt_decode(token);
            //console.log(decoded);
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
    console.log(userData);
    return axios
        .post(`${URL}/${USERS}`, userData)
        .then(user => { return user })
        .catch(err => {
            return Promise.reject(err.response.data);
        })
}

const updateUser = userData => {
    console.log(userData);
    return axios
        .put(`${URL}/${USERS}`, userData)
        .then(user => { return user })
        .catch(err => {
            return Promise.reject(err.response.data);
        })
}

const createTraineeUser = (userData) => {
    return axios
        .post(`${URL}/${USERS}/trainee`, userData)
        .then(user => { return user.data })
        .catch(err => {
            return Promise.reject(err.response.data);
        })
}

const updateTraineeUser = (id, userData) => {
    return axios
        .put(`${URL}/${USERS}/trainee/${id}`, userData)
        .then(user => { return user })
        .catch(err => {
            return Promise.reject(err.response.data);
        })
}
const deleteTrainee = (id) => {
    return axios
        .delete(`${URL}/${USERS}/trainee/${id}`)
        .then(user => { return user })
        .catch(err => {
            return Promise.reject(err.response.data);
        })
}

const updateAvatarPic = (formData) => {
    console.log(formData);
    return axios
        .post(`${URL}/api/upload`, { headers: { "Content-Type": "multipart/form-data" }, formData })
        .then(user => { console.log(user); return `${URL}/${user.data}` })
        .catch(err => {
            return Promise.reject(err.response.data);
        })
}

export const userService = {
    login,
    logout,
    register,
    updateUser,
    createTraineeUser,
    updateTraineeUser,
    deleteTrainee,

    updateAvatarPic,
};