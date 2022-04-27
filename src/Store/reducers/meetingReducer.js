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
    CLOSE_ACTIVE_MEETING,
    SET_MEETING_COMPKITED,
    SET_MEETING_COMPKITED_URL
} from '../actions/types';

const initialState = {
    loading: false,
    all_meetings: null,
    meetings: null, // futuer meetings only
    upcoming_meeting: null,// upcomung meeting myte be also the active meeting
    active_meeting: null, //meeting thet both users clicked joinRoom and not click closeRoom
    meetings_complited: null, //status=false && urlRoom is difiend - in order to watch 
}

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
            console.log(state.meetings);
            if (state.upcoming_meeting?._id === meeting) {
                let mm = state.meetings
                if (mm) mm = mm.filter(m => m._id !== meeting)
                console.log('mm', mm);
                if (mm && mm.lenght !== 0) return mm[0]
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
            let activeMeeting = action.payload ? action.payload.find(el => el.status === true) : null;
            console.log('meetings_complited', isEmpty(meetingsComplited));
            console.log('activeMeeting', activeMeeting);

            // console.log(meetingsComplited);
            // meetingsComplited.sort((a, b) => { console.log(a, b); return a.dateEnd - b.dateEnd })
            // console.log('meetingsComplited', meetingsComplited);
            return {
                ...state,
                all_meetings: action.payload,
                meetings_complited: !isEmpty(meetingsComplited) ? meetingsComplited.sort((a, b) => { return a.dateEnd - b.dateEnd }) : null,
                active_meeting: activeMeeting,
                loading: false,
            };
        case CREATE_MEETING:
            console.log(action.payload.data.data);
            let add_all = state.all_meetings ? [...state.all_meetings, action.payload.data.data] : null
            let meetings = state.all_meetings ? [...state.meetings, action.payload.data.data] : null

            // let meetings = state.meetings ? [...state.meetings, action.payload.data.data] : null
            return {
                ...state,
                all_meetings: !state.all_meetings ? [action.payload.data.data] : add_all.sort((a, b) => { return a.date - b.date }),//  [...state.all_meetings, action.payload.data.data],
                meetings: !state.meetings ? [action.payload.data.data] : meetings.sort((a, b) => { return a.date - b.date }), // [...state.meetings, action.payload.data.data],
                upcoming_meeting: setUpcomingMeeting(action.payload.data.data, 'add'),
                loading: false,
            };
        case SET_ACTIVE_MEETING:
            console.log("SET_ACTIVE_MEETING", action.payload);
            return {
                ...state,
                loading: false,
                active_meeting: (action.payload && action.payload?.status) ? action.payload : null
            };
        case SET_MEETING_COMPKITED:
            console.log("SET_MEETING_COMPKITED", action.payload);
            return {
                ...state,
                loading: false,
                active_meeting: !action.payload?.status && null,
                meetings: !state.meetings ? null : state.meetings.filter(m => m._id !== action.payload._id),
                all_meetings: state.all_meetings.map(m => (m?._id === action.payload?._id) ? m = action.payload : m),
                meetings_complited: !state.meetings_complited ? [action.payload] : [...state.meetings_complited, action.payload],//  state.meetings_complited.push(action.payload),
                upcoming_meeting: setUpcomingMeeting(action.payload._id, 'delete'),

            };
        case SET_MEETING_COMPKITED_URL:
            console.log("SET_MEETING_COMPKITED_URL", action.payload);
            //state.meetings_complited && state.meetings_complited.map(m => (m?._id === action.payload?._id) ? m = action.payload : m);
            //state.meetings_complited.sort((a, b) => { return a.date - b.date })
            return {
                ...state,
                loading: false,
                all_meetings: state.all_meetings.map(m => (m?._id === action.payload?._id) ? m = action.payload : m),
                meetings_complited: !state.meetings_complited ? null : state.meetings_complited.map(m => (m?._id === action.payload?._id) ? m = action.payload : m),//state.meetings_complited.sort((a, b) => { return a.dateEnd - b.dateEnd }) // state.meetings_complited.map(m => (m?._id === action.payload?._id) ? m = action.payload : m),
            };

        case GET_ACTIVE_MEETING:
            console.log("GET_ACTIVE_MEETING", action.payload);
            return {
                ...state,
                loading: false,
                active_meeting: action.payload
            };
        case CLOSE_ACTIVE_MEETING:
            console.log("CLOSE_ACTIVE_MEETING")
            let meeting = state.active_meeting;
            return {
                ...state,
                loading: false,
                active_meeting: null,
                all_meetings: state.all_meetings.map(m => { if (m._id !== meeting._id) m.status = false }),
                meetings: !state.meetings ? null : state.meetings.filter(m => m._id !== meeting._id),
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