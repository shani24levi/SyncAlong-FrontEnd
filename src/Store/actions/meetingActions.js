import {
    GET_ERRORS, GET_MEETINGS, GET_FUTURE_MEETINGS, MEETINGS_LOADING
    , CREATE_MEETING
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

function failure(error) { return { type: GET_ERRORS, payload: error.error } }
