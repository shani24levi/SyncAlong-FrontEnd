import axios from 'axios';
import { URL } from '../Utils/globalVaribals';
const PROFILES = 'api/profiles';

const createProfile = (data) => {
    console.log(data);
    return axios
        .post(`${URL}/${PROFILES}`, data)
        .then(profile => { console.log(profile); return profile.data })
        .catch(err => {
            return Promise.reject(err.response.data);
        })
}

// return fetch(`${URL}/${PROFILES}`, {
//     body: JSON.stringify(data),
//     headers: { 'content-type': 'application/json', Authorization: 'Bearer ' + localStorage.getItem('user') },
//     method: 'PUT'
// })

const update = (data) => {
    return axios
        .put(`${URL}/${PROFILES}`, data)
        .then(profile => { return profile.data }) //returns only what has been uptadted ant not all data
        .catch(err => {
            return Promise.reject(err.response.data);
        })
}

const getProfile = () => {
    return axios
        .get(`${URL}/${PROFILES}`)
        .then(profile => { return profile.data })
        .catch(err => {
            return Promise.reject(err.response.data);
        })
}

const createTraineeProfile = (trinee_id, data) => {
    return axios
        .post(`${URL}/${PROFILES}/trainee/${trinee_id}`, data)
        .then(profile => { console.log(profile); return profile.data.data })
        .catch(err => {
            return Promise.reject(err.response.data);
        })
}

const updateTraineeProfile = (trinee_id, data) => {
    return axios
        .put(`${URL}/${PROFILES}/trainee/${trinee_id}`, data)
        .then(profile => { return profile })
        .catch(err => {
            return Promise.reject(err.response.data);
        })
}

const getTraineeProfile = (trinee_id) => {
    return axios
        .get(`${URL}/${PROFILES}/trainee/${trinee_id}`)
        .then(profile => { return profile.data })
        .catch(err => {
            return Promise.reject(err.response.data);
        })
}

const deleteTraineeProfile = (trinee_id) => {
    return axios
        .put(`${URL}/${PROFILES}/trainee/${trinee_id}`)
        .then(profile => { return profile.data })
        .catch(err => {
            return Promise.reject(err.response.data);
        })
}

export const profileService = {
    createProfile,
    update,
    // deleteProfile,
    getProfile,

    getTraineeProfile,
    updateTraineeProfile,
    createTraineeProfile,
    deleteTraineeProfile
};
