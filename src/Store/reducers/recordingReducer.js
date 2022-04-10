import { ConstructionOutlined } from '@mui/icons-material';
import isEmpty from '../../validation/isEmpty';
import {
    GET_ERRORS,
    REC_LOADING,
    GET_CURR_REC,
    CLEAR_REC,
} from '../actions/types';

const initialState = {
    loading: false,
    recording: null,
    meeting: null,

}

export default function (state = initialState, action) {
    switch (action.type) {
        case REC_LOADING:
            return {
                ...state,
                loading: action.payload
            };
        case CLEAR_REC:
            return {
                loading: false,
                recording: null,
                meeting: null,
            };
        case GET_CURR_REC:
            console.log('GET_CURR_REC', action.payload);
            return {
                ...state,
                loading: false,
                recording: action.payload,
                meeting: action.payload ? action.payload.meeting_id : null
            }
        default:
            return state;
    }
}