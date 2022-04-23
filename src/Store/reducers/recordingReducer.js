import { ConstructionOutlined } from '@mui/icons-material';
import isEmpty from '../../validation/isEmpty';
import {
    GET_ERRORS,
    REC_LOADING,
    GET_CURR_REC,
    CLEAR_REC,
    SET_RECORDING
} from '../actions/types';

const initialState = {
    loading: false,
    recording: null,
    meeting: null,
    dateEnd: null
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
                dateEnd: null
            };
        case SET_RECORDING:
            console.log('SET_RECORDING', action.payload);
            return {
                ...state,
                loading: false,
                recording: action.payload.url,
                meeting: action.payload ? action.payload.meeting_id : null,
                dateEnd: action.payload.dateEnd
            }
        default:
            return state;
    }
}