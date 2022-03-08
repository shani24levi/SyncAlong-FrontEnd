import isEmpty from '../../validation/isEmpty';
import { CREATE_MEETING, GET_ERRORS, GET_MEETINGS,  GET_FUTURE_MEETINGS, MEETINGS_LOADING, GET_CURR_ACTIVITIES } from '../actions/types';

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
        case CREATE_MEETING:
            return {
                meetings: [action.payload, ...state.meetings],
                loading: false,
            };
        case GET_CURR_ACTIVITIES:
            console.log("GET_CURR_ACTIVITIES", action.payload);
            return {
               ...state,
               loading: false,
               activities: action.payload 
            }
        default:
            return state;
    }
}