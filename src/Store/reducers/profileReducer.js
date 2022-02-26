import { GET_ERRORS, PROFILE_LOADING, GET_PROFILE, GET_CURR_PROFILE } from '../actions/types';

const initialState = {
    loading: false,
    is_profile_complited: false,
    profile: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case PROFILE_LOADING:
            return {
                ...state,
                loading: action.payload
            };
        case GET_PROFILE:
            return {
                is_profile_complited: true,
                profile: action.payload,
                loading: false,
            };
        case GET_CURR_PROFILE:
            return {
                ...state,
                loading: false,
            };

        default:
            return state;
    }
}