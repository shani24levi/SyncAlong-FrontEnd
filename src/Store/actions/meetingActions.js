import {
    GET_ERRORS, GET_MEETINGS, GET_FUTURE_MEETINGS, MEETINGS_LOADING
    , CREATE_MEETING, GET_CURR_ACTIVITIES,
    GET_ALL_MEETINGS,
    SET_ACTIVE_MEETING,
    GET_ACTIVE_MEETING,
} from './types';
import { meetingsService } from '../../servises';
import { redirect } from '../../helpers';
import { alertActions } from './alertActions';

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
    // dispatch(setLoading(true));
    console.log('meetings');
    meetingsService.allMeetings()
        .then(
            meetings => {
                console.log(meetings);
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
                    payload: {}
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


export const getActivities = (id) => dispatch => {
    dispatch(setLoading(true));
    meetingsService.getActivities(id)
        .then(
            activities => {
                dispatch(success(activities))
            },
            error => {
                dispatch(setLoading(false));
                dispatch(failure(error));
            }
        );
    function success(activities) { return { type: GET_CURR_ACTIVITIES, payload: activities } }
};

export const setActiveMeeting = (meeting, status) => dispatch => {
    console.log('status', status);
    dispatch(setLoading(true));
    if (status) {
        meetingsService.setActiveMeeting(meeting._id, status)
            .then(
                meetings => {
                    meeting.status = status;
                    dispatch(success(meeting))
                },
                error => {
                    dispatch(success(null));
                }
            );
    }
    else {
        dispatch(success(null))
    }
    function success(activities) { return { type: SET_ACTIVE_MEETING, payload: meeting } }
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
    function success(activities) { return { type: GET_ACTIVE_MEETING, payload: meeting } }
}



function failure(error) { return { type: GET_ERRORS, payload: error.error } }
