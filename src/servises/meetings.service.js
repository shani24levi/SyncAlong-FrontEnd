import axios from 'axios';
import { URL } from '../utils/globalVaribals';
const MEETINGS = 'api/meetings';

const futureMeetings = () => {
    return axios
        .get(`${URL}/${MEETINGS}/future`)
        .then(meetings => {
            return meetings.data;
        })
        .catch(err => {
            console.log('eeee', err);
            return Promise.reject(err.response.data);
        })
}

const craete = (data) => {
    return axios
        .post(`${URL}/${MEETINGS}`, data)
        .then(meetings => { console.log(meetings); return meetings })
        .catch(err => {
            return Promise.reject(err.response.data);
        })
}

const updateMeeting = (id, data) => {
    return axios
        .put(`${URL}/${MEETINGS}/${id}`, data)
        .then(meetings => { return meetings })
        .catch(err => {
            return Promise.reject(err.response.data);
        })
}

const deleteMeeting = (id) => {
    return axios
        .delete(`${URL}/${MEETINGS}/${id}`)
        .then(meetings => { return meetings })
        .catch(err => {
            return Promise.reject(err.response.data);
        })
}

const getallMeetings = () => {
    return axios
        .get(`${URL}/${MEETINGS}`)
        .then(meetings => { return meetings })
        .catch(err => {
            return Promise.reject(err.response.data);
        })
}

const getMeetingsById = (id) => {
    return axios
        .get(`${URL}/${MEETINGS}/${id}`)
        .then(meetings => { return meetings })
        .catch(err => {
            return Promise.reject(err.response.data);
        })
}

export const meetingsService = {
    futureMeetings,
    craete,
    updateMeeting,
    deleteMeeting,
    getallMeetings,
    getMeetingsById,
};