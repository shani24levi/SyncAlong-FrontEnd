import {
    SYNC_PERFORM_LOADING,
    GET_CURR_SYNC_PERFORM,
    CLEAR_SYNC_PERFORM,
    CREATE_MEETING_SYNC,
    GET_TRAINEES_SYNC_PERFORM,
} from './types';
import { syncperformanceService } from '../../servises';

export const clearLogoutSyncs = () => { return { type: CLEAR_SYNC_PERFORM }; };

export const setLoading = (val) => {
    return {
        type: SYNC_PERFORM_LOADING,
        payload: val
    };
};

export const createMeetingSync = data => dispatch => {
    dispatch(setLoading(true));
    syncperformanceService.createMeetingSync(data)
        .then(
            sync => {
                console.log('syncsync', sync);
                dispatch(success(sync));
            },
            error => {
                dispatch(setLoading(false));
                dispatch(failure(error));
            }
        );
    function success(sync) { return { type: CREATE_MEETING_SYNC, payload: sync } }
    function failure(error) { return { type: CREATE_MEETING_SYNC, payload: null } }

};

export const getMySyncs = () => dispatch => {
    dispatch(setLoading(true));
    syncperformanceService.getMySyncs()
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
        return { type: GET_CURR_SYNC_PERFORM, payload: syncs }
    }
    function failure(error) { return { type: GET_CURR_SYNC_PERFORM, payload: null } }
};

export const getTraineesSyncs = () => dispatch => {
    dispatch(setLoading(true));
    syncperformanceService.getTraineesSyncs()
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
        return { type: GET_TRAINEES_SYNC_PERFORM, payload: syncs }
    }
    function failure(error) { return { type: GET_TRAINEES_SYNC_PERFORM, payload: null } }
};
