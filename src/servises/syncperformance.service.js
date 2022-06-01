import axios from 'axios';
import { URL } from '../Utils/globalVaribals';
const SYNC = 'api/syncperformance';

const createMeetingSync = (data) => {
    console.log(data);
    return axios
        .post(`${URL}/${SYNC}`, data)
        .then(sync => { return sync.data.data })
        .catch(err => {
            return Promise.reject(err.response.data);
        })
}

const getMySyncs = () => {
    return axios
        .get(`${URL}/${SYNC}`)
        .then(syncs => {
            console.log('syncs', syncs.data);
            return syncs.data.data
        })
        .catch(err => {
            return Promise.reject(err.response.data);
        })
}

const getTraineesSyncs = () => {
    return axios
        .get(`${URL}/${SYNC}/trainess`)
        .then(syncs => {
            console.log('syncs', syncs.data);
            return syncs.data.data
        })
        .catch(err => {
            return Promise.reject(err.response.data);
        })
}

export const syncperformanceService = {
    getMySyncs,
    createMeetingSync,
    getTraineesSyncs
};