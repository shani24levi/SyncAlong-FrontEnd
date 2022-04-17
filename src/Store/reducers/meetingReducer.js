import isEmpty from '../../validation/isEmpty';
import inFutuer from '../../validation/inFutuer';

import {
    CREATE_MEETING, GET_ERRORS, GET_MEETINGS, GET_FUTURE_MEETINGS,
    MEETINGS_LOADING,
    GET_ALL_MEETINGS,
    SET_ACTIVE_MEETING,
    GET_ACTIVE_MEETING,
    DELETE_MEETING,
    CLEAR_MEETINGS,
} from '../actions/types';

const initialState = {
    loading: false,
    all_meetings: null,
    meetings: null, // futuer meetings only
    upcoming_meeting: null,// upcomung meeting myte be also the active meeting
    active_meeting: null, //meeting thet both users clicked joinRoom and not click closeRoom
    meetings_complited: null, //status=false && urlRoom is difiend - in order to watch 
}



// const dates = [
//     new Date('July 20, 2021 20:17:40'),
//     new Date('August 19, 2021 23:15:30'),
//     new Date('July 20, 2021 23:15:30'),
//     new Date('August 19, 2021 20:17:40')
//   ];

//   dates.sort(function (a, b) {
//     return a - b
//   });


export default function (state = initialState, action) {
    const setUpcomingMeeting = (meeting, type) => {
        if (type === 'add') {
            console.log(inFutuer(meeting.date, new Date().setSeconds(0, 0)));
            if (!state.upcoming_meeting && inFutuer(meeting?.date, new Date().setSeconds(0, 0))) return meeting;
            if (inFutuer(state.upcoming_meeting?.date, meeting?.date)) {
                console.log('up', meeting);
                return meeting;
            }
            else {
                console.log('up starte', state.upcoming_meeting);
                return state.upcoming_meeting;
            }
        }

        else if (type === 'delete') {
            if (state.upcoming_meeting._id === meeting._id) {
                if (state.meetings && state.meetings.lenght !== 0) return state.meetings[0]
                else return null
            } else return state.upcoming_meeting;
        }
    }
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
                meetings_complited: null
            };
        case GET_FUTURE_MEETINGS:
            action.payload = action.payload?.filter(el => el.status !== true);
            return {
                ...state,
                meetings: !action.payload ? null : action.payload,
                upcoming_meeting: !action.payload || action.payload.lenght === 0 ? null : action.payload[0],
                loading: false,
            };
        case GET_ALL_MEETINGS:
            console.log('GET_ALL_MEETINGS.payload', action.payload);
            let meetingsComplited = action.payload ? action.payload.filter(el => !isEmpty(el.urlRoom)) : null;
            let activeMeeting = action.payload ? action.payload.find(el => el.status) : null;
            console.log('meetings_complited', isEmpty(meetingsComplited), meetingsComplited.lenght);
            return {
                ...state,
                all_meetings: action.payload,
                meetings_complited: !isEmpty(meetingsComplited) ? meetingsComplited : null,
                active_meeting: activeMeeting,
                loading: false,
            };
        case CREATE_MEETING:
            console.log(action.payload.data.data);
            let add_all = [...state.all_meetings, action.payload.data.data]
            let meetings = [...state.meetings, action.payload.data.data]
            return {
                ...state,
                all_meetings: !state.all_meetings ? [action.payload.data.data] : add_all.sort((a, b) => { return a.date - b.date }),//  [...state.all_meetings, action.payload.data.data],
                meetings: !state.meetings ? [action.payload] : meetings.sort((a, b) => { return a.date - b.date }), // [...state.meetings, action.payload.data.data],
                upcoming_meeting: setUpcomingMeeting(action.payload.data.data, 'add'),
                loading: false,
            };
        case SET_ACTIVE_MEETING:
            console.log("SET_ACTIVE_MEETING", action.payload);
            return {
                ...state,
                loading: false,
                active_meeting: (!action.payload && action.payload?.status) ? action.payload : null
            };
        case GET_ACTIVE_MEETING:
            console.log("GET_ACTIVE_MEETING", action.payload);
            return {
                ...state,
                loading: false,
                active_meeting: action.payload
            };
        case DELETE_MEETING:
            console.log("DELETE_MEETING", action.payload);
            return {
                ...state,
                loading: false,
                active_meeting: (!state.active_meeting && state.active_meeting?._id === action.payload) ? null : state.active_meeting,
                meetings: !state.meetings ? null : state.meetings.filter(m => m._id !== action.payload),
                all_meetings: state.all_meetings.filter(m => m._id !== action.payload),
                meetings_complited: !state.meetings_complited ? null : state.meetings_complited.filter(m => m._id !== action.payload),
                upcoming_meeting: setUpcomingMeeting(action.payload, 'delete') //state.upcoming_meeting?._id === action.payload ? null : state.upcoming_meeting,
            };

        default:
            return state;
    }
}