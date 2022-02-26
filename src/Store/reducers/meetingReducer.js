import isEmpty from '../../validation/isEmpty';
import { GET_ERRORS, GET_MEETINGS, GET_FUTURE_MEETINGS, MEETINGS_LOADING } from '../actions/types';

const initialState = {
    loading: false,
    meetings: null,
    upcoming_meeting: null,
}

export default function (state = initialState, action) {
    switch (action.type) {
        case MEETINGS_LOADING:
            return {
                ...state,
                loading: action.payload
            };
        case GET_FUTURE_MEETINGS:
            return {
                meetings: action.payload,
                upcoming_meeting: action.payload.lenght === 0 ? null : action.payload[0],
                loading: false,
            };
        default:
            return state;
    }
}