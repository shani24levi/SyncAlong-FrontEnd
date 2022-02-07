import { GET_ERRORS, PROFILE_LOADING, GET_PROFILE, GET_CURR_PROFILE } from './types';
import { userService } from '../../servises';
import { redirect } from '../../helpers';
import { alertActions } from './alertActions';

export const setLoading = (val) => {
    return {
        type: PROFILE_LOADING,
        payload: val
    };
};