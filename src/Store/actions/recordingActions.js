import {
    GET_ERRORS,
    REC_LOADING,
    GET_CURR_REC,
    CLEAR_REC,
    SET_RECORDING,
} from './types';
import { recording } from '../../servises';

export const clearLogoutREC = () => { return { type: CLEAR_REC }; };

export const setLoading = (val) => {
    return {
        type: REC_LOADING,
        payload: val
    };
};

export const createRecordingById = (formData, id) => dispatch => {
    dispatch(setLoading(true));
    recording.createRecordingById(formData, id)
        .then(
            rec => {
                console.log("rec", rec.data.data);
                dispatch(success(rec))
            },
            error => {
                dispatch(setLoading(false));
                dispatch(failure(error));
            }
        );
    function success(rec) {
        return { type: SET_RECORDING, payload: rec.data.data }
    }
};

function failure(error) { return { type: GET_ERRORS, payload: error.error } }
