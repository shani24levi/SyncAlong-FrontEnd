import {
    GET_ERRORS,
    SYNC_LOADING,
    GET_CURR_SYNCS,
    CLEAR_SYNCS,
} from './types';
import { syncService } from '../../servises';

export const clearLogoutSyncs = () => { return { type: CLEAR_SYNCS }; };

export const setLoading = (val) => {
    return {
        type: SYNC_LOADING,
        payload: val
    };
};

export const getSync = (id) => dispatch => {
    dispatch(setLoading(true));
    syncService.getSyncsById(id)
        .then(
            syncs => {
                console.log("success sync", syncs);
                dispatch(success(syncs))
            },
            error => {
                dispatch(setLoading(false));
                dispatch(failure(error));
            }
        );
    function success(syncs) {
        return { type: GET_CURR_SYNCS, payload: { syncs, id } }
    }
};

function failure(error) { return { type: GET_ERRORS, payload: error.error } }
