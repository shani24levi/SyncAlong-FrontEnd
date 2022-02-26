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


export const meetingsService = {
    futureMeetings,
    // getAll,
    // getById,
    // update,
    // delete: _delete
};