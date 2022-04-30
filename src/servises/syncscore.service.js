import axios from 'axios';
import { URL } from '../Utils/globalVaribals';
const SYNC = 'api/syncscores';

const getSyncsById = (id) => {

    return axios
        .get(`${URL}/${SYNC}/${id}`)
        .then(syncs => {
            console.log('syncs', syncs.data);
            return syncs.data.data
        })
        .catch(err => {
            return Promise.reject(err.response.data);
        })
}

export const syncService = {
    getSyncsById
};