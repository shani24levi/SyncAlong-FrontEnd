import {
    PROFILE_LOADING,
    SET_CURR_PROFILE,
    PROFILE_CREATE,
    TRINEE_PROFILE_CREATE,
    UPDATE_TRAINEES_LIST,
    DELETE_TRAINEE,
} from '../actions/types';

const initialState = {
    loading: false,
    // is_profile_complited: false,
    profile: null,
    trainees_profiles: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case PROFILE_LOADING:
            return {
                ...state,
                loading: action.payload
            };
        case SET_CURR_PROFILE:
            return {
                loading: false,
                profile: action.payload
            };
        case PROFILE_CREATE:
            return {
                ...state,
                loading: false,
                profile: action.payload,
            };
        case TRINEE_PROFILE_CREATE:
            let new_trainee = {
                id: action.payload.id,
                profile: action.payload.profile
            }
            return {
                ...state,
                loading: false,
                trainees_profiles: [...new_trainee]
            };
        case UPDATE_TRAINEES_LIST:
            let new_trainees = state.trainees_profiles?.map(i => {
                if (action.payload.id == i.id) {
                    i.profile = action.payload.profile;
                }
            })
            return {
                ...state,
                loading: false,
                trainees_profiles: new_trainees
            };
        case DELETE_TRAINEE:
            new_trainees = state.trainees_profiles.filter(i => action.payload.id !== i.id)
            return {
                ...state,
                loading: false,
                trainees_profiles: new_trainees
            };

        default:
            return state;
    }
}