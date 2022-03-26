import { ConstructionOutlined } from '@mui/icons-material';
import isEmpty from '../../validation/isEmpty';
import {
    GET_ERRORS,
    SYNC_LOADING,
    GET_CURR_SYNCS,
    CLEAR_SYNCS,
} from '../actions/types';

const initialState = {
    loading: false,
    all_syncs: null,
    meeting: null,

}

export default function (state = initialState, action) {
    switch (action.type) {
        case SYNC_LOADING:
            return {
                ...state,
                loading: action.payload
            };
        case CLEAR_SYNCS:
            return {
                loading: false,
                all_syncs: null,
                meeting: null,
            };
        case GET_CURR_SYNCS:
            console.log('GET_CURR_SYNCS', action.payload);
            return {
                ...state,
                loading: false,
                all_syncs: action.payload,
                meeting: action.payload ? action.payload[0].meeting_id : null
            }
        default:
            return state;
    }
}