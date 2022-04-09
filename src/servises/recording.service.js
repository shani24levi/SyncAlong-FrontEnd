import axios from 'axios';
import { URL } from '../Utils/globalVaribals';
const REC = 'api/recordings';

const createRecordingById = (formData, id) => {
    console.log(formData.getAll('file'), id);
    return axios
        .post(`${URL}/${REC}/${id}`, formData, {headers: {'Content-Type': 'multipart/form-data'}})
        .then(url => {
            console.log('url', url);
            return url
        })
        .catch(err => {
            return Promise.reject(err.response.data);
        })
}

export const recording = {
    createRecordingById
};