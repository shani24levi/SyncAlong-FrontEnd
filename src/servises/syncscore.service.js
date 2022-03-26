import axios from 'axios';
import { URL } from '../Utils/globalVaribals';
const SYNC = 'api/syncscores';

const getSyncsById = (id) => {
    return axios
        .get(`${URL}/${SYNC}/${id}`)
        .then(syncs => { return syncs })
        .catch(err => {
            return Promise.reject(err.response.data);
        })
}

export const syncService = {
    getSyncsById
};