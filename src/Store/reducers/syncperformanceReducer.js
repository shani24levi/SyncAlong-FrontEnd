import isEmpty from '../../validation/isEmpty';
import {
    GET_ERRORS,
    SYNC_PERFORM_LOADING,
    GET_CURR_SYNC_PERFORM,
    CLEAR_SYNC_PERFORM,
    CREATE_MEETING_SYNC,
    GET_TRAINEES_SYNC_PERFORM,
} from '../actions/types';

const initialState = {
    loading: false,
    syncs: [],
    trainees: [],
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SYNC_PERFORM_LOADING:
            return {
                ...state,
                loading: action.payload
            };
        case CLEAR_SYNC_PERFORM:
            return {
                loading: false,
                syncs: null,
                trainees: null,
            };
        case GET_CURR_SYNC_PERFORM:
            console.log('GET_CURR_SYNC_PERFORM', action.payload);
            return {
                ...state,
                loading: false,
                syncs: isEmpty(action.payload) ? null : action.payload,
            }
        case CREATE_MEETING_SYNC:
            console.log('CREATE_MEETING_SYNC', action.payload);
            return {
                ...state,
                loading: false,
                syncs: isEmpty(state.syncs) ? action.payload : [...state.syncs, action.payload],
            }
        case GET_TRAINEES_SYNC_PERFORM:
            console.log('GET_TRAINEES_SYNC_PERFORM', action.payload);
            return {
                ...state,
                loading: false,
                trainees: action.payload
            }

        default:
            return state;
    }
}