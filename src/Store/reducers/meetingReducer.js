import isEmpty from '../../validation/isEmpty';
import {
    CREATE_MEETING, GET_ERRORS, GET_MEETINGS, GET_FUTURE_MEETINGS,
    MEETINGS_LOADING, GET_CURR_ACTIVITIES, GET_ALL_MEETINGS,
    SET_ACTIVE_MEETING,
    GET_ACTIVE_MEETING,
    DELETE_MEETING,
    CLEAR_MEETINGS,
} from '../actions/types';

const initialState = {
    loading: false,
    all_meetings: null,
    meetings: null,
    upcoming_meeting: null,
    active_meeting: null,
}

export default function (state = initialState, action) {
    switch (action.type) {
        case MEETINGS_LOADING:
            return {
                ...state,
                loading: action.payload
            };
        case CLEAR_MEETINGS:
            return {
                loading: false,
                all_meetings: null,
                meetings: null,
                upcoming_meeting: null,
                active_meeting: null,
            };
        case GET_FUTURE_MEETINGS:
            return {
                ...state,
                meetings: !action.payload ? null : action.payload,
                upcoming_meeting: !action.payload || action.payload.lenght === 0 ? null : action.payload[0],
                loading: false,
            };
        case GET_ALL_MEETINGS:
            return {
                ...state,
                all_meetings: action.payload,
                loading: false,
            };

        case CREATE_MEETING:
            console.log(action.payload.data.data);
            return {
                ...state,
                all_meetings: !state.all_meetings ? [action.payload] : [...state.all_meetings, action.payload.data.data],
                meetings: !state.meetings ? [action.payload] : [...state.meetings, action.payload.data.data],
                // [action.payload, ...state.meetings],
                loading: false,
            };
        case GET_CURR_ACTIVITIES:
            console.log("GET_CURR_ACTIVITIES", action.payload);
            return {
                ...state,
                loading: false,
                activities: action.payload
            }
        case SET_ACTIVE_MEETING:
            console.log("SET_ACTIVE_MEETING", action.payload);
            return {
                ...state,
                loading: false,
                active_meeting: (!action.payload && action.payload?.status) ? action.payload : null
            }

        case GET_ACTIVE_MEETING:
            console.log("GET_ACTIVE_MEETING", action.payload);
            return {
                ...state,
                loading: false,
                active_meeting: action.payload
            }
        case DELETE_MEETING:
            console.log("DELETE_MEETING", action.payload);
            return {
                ...state,
                loading: false,
                meetings: !state.meetings ? null : state.meetings.filter(m => m._id !== action.payload),
                all_meetings: state.all_meetings.filter(m => m._id !== action.payload),
                upcoming_meeting: state.upcoming_meeting?._id === action.payload ? null : state.upcoming_meeting,
            }


        default:
            return state;
    }
}