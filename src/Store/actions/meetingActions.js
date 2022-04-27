import {
    GET_ERRORS, GET_MEETINGS, GET_FUTURE_MEETINGS, MEETINGS_LOADING
    , CREATE_MEETING,
    GET_ALL_MEETINGS,
    SET_ACTIVE_MEETING,
    GET_ACTIVE_MEETING,
    DELETE_MEETING,
    CLEAR_MEETINGS,
    CLOSE_ACTIVE_MEETING,
    SET_MEETING_COMPKITED,
    SET_MEETING_COMPKITED_URL
} from './types';
import { meetingsService } from '../../servises';
import { redirect } from '../../helpers';
import { alertActions } from './alertActions';

export const clearLogoutMeetings = () => { return { type: CLEAR_MEETINGS }; };

export const setLoading = (val) => {
    return {
        type: MEETINGS_LOADING,
        payload: val
    };
};

export const futureMeetings = () => dispatch => {
    dispatch(setLoading(true));
    meetingsService.futureMeetings()
        .then(
            meetings => {
                 console.log('futureMeetings', meetings.data);
                dispatch({
                    type: GET_FUTURE_MEETINGS,
                    payload: meetings.data
                })
            },
            error => {
                dispatch(setLoading(false));
                dispatch({
                    type: GET_FUTURE_MEETINGS,
                    payload: {}
                })
            }
        );
};

export const getAllMeetings = () => dispatch => {
    dispatch(setLoading(true));
    meetingsService.allMeetings()
        .then(
            meetings => {
                dispatch({
                    type: GET_ALL_MEETINGS,
                    payload: meetings.data
                })
            },
            error => {
                console.log('erer');
                dispatch(setLoading(false));
                dispatch({
                    type: GET_ALL_MEETINGS,
                    payload: null
                })
            }
        );
};

export const craeteMeetings = (data) => dispatch => {
    dispatch(setLoading(true));
    meetingsService.craete(data)
        .then(
            meetings => {
                dispatch(success(meetings))
            },
            error => {
                dispatch(setLoading(false));
                dispatch(failure(error));
            }
        );
    function success(meetings) { return { type: CREATE_MEETING, payload: meetings } }
};

export const setActiveMeeting = (meeting, status) => dispatch => {
    meeting.status = status;
    console.log('status', status, meeting);
    dispatch(setLoading(true));
    meetingsService.setActiveMeeting(meeting._id, status)
        .then(
            meetings => {
                dispatch(success(meeting))
            },
            error => {
                console.log('error', error);
                dispatch(success(null));
            }
        );
    function success(meeting) { return { type: SET_ACTIVE_MEETING, payload: meeting } }
}

export const setMeetingComplited = (meeting, data) => dispatch => {
    console.log('setMeetingComplited', meeting, data);
    meeting.status = data.status;
    meeting.urlRoom = data.urlRoom; //"Processing"
    console.log('status', meeting);
    dispatch(setLoading(true));
    dispatch(success(meeting))
    function success(meeting) {
        return {
            type: SET_MEETING_COMPKITED,
            payload: meeting
        }
    }
}

export const setComplitedWithUrl = (meeting, data) => dispatch => {
    console.log('setComplitedWithUrl', meeting, data);
    meeting.urlRoom = data.urlRoom; //"Processing"
    meeting.dateEnd = data.dateEnd; // end time of meeting when save with url..
    console.log('status', data, meeting);
    dispatch(setLoading(true));
    dispatch(success(meeting))
    function success(meeting) {
        return {
            type: SET_MEETING_COMPKITED_URL,
            payload: meeting
        }
    };
}

export const closeActiveMeeting = () => dispatch => {
    dispatch(setLoading(true));
    return { type: CLOSE_ACTIVE_MEETING }
}


export const getActiveMeeting = () => dispatch => {
    dispatch(setLoading(true));
    meetingsService.getActiveMeeting()
        .then(
            meetings => {
                dispatch(success(meetings))
            },
            error => {
                dispatch(success(null));
            }
        );
    function success(meetings) { return { type: GET_ACTIVE_MEETING, payload: meetings } }
}

export const deleteMeeting = (id) => dispatch => {
    dispatch(setLoading(true));
    console.log('id', id);
    if (id?._id) id = id._id;
    meetingsService.deleteMeeting(id) //id._id
        .then(
            meetings => {
                dispatch(success(id))
            },
            error => {
                dispatch(success(null));
            }
        );
    function success(meetings) { return { type: DELETE_MEETING, payload: id } }
}

function failure(error) { return { type: GET_ERRORS, payload: error.error } }
