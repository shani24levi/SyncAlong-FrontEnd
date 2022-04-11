import {
    PROFILE_LOADING,
    SET_CURR_PROFILE,
    PROFILE_CREATE,
    SET_CURR_TRAINEES,
    TRINEE_PROFILE_CREATE,
    UPDATE_TRAINEES_LIST,
    DELETE_TRAINEE, UPDATE_PROFILE,
    TRAINEE_CREATE_SUCCESS,
    SET_ALL_TRAINEES,
    CLEAR_PROFILE,
} from '../actions/types';

const initialState = {
    loading: false,
    profile: null,
    trainees_profiles: [],
    trainee_profile_success: false,
    trainee_profile_called: false,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case PROFILE_LOADING:
            return {
                ...state,
                loading: action.payload
            };
        case CLEAR_PROFILE:
            return {
                loading: false,
                profile: null,
                trainees_profiles: [],
                trainee_profile_success: false,
                trainee_profile_called: false,
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
                profile: action.payload.data,
            };
        case UPDATE_PROFILE:
            if (action.payload.data.address) state.profile.address = action.payload.data.address;
            if (action.payload.data.phone) state.profile.phone = action.payload.data.phone
            if (action.payload.data.city) state.profile.city = action.payload.data.city
            if (action.payload.data.contry) state.profile.contry = action.payload.data.contry
            if (action.payload.data.age) state.profile.age = action.payload.data.age
            if (action.payload.data.gender) state.profile.gender = action.payload.data.gender
            if (action.payload.data.hobbies) state.profile.hobbies = action.payload.data.hobbies
            if (action.payload.data.about) state.profile.about = action.payload.data.about
            return {
                ...state,
                loading: false,
            };
        case SET_CURR_TRAINEES:
            return {
                ...state,
                loading: false,
                trainees_profiles: !state.trainees_profiles ? [action.payload] : [...state.trainees_profiles, action.payload],
                trainee_profile_called: true,
            };
        case SET_ALL_TRAINEES:
            return {
                ...state,
                loading: false,
                trainees_profiles: action.payload.data,
                trainee_profile_called: true,
            };
        case TRAINEE_CREATE_SUCCESS: //user create of tarinee
            state.profile?.trainerOf?.push(action.payload.data?._id) //add to the curr list state
            return {
                ...state,
                loading: false,
                trinee_added: action.payload.data,
                trainee_profile_success: false,
            };
        case TRINEE_PROFILE_CREATE: //profile ceate
            return {
                ...state,
                loading: false,
                trainees_profiles: !state.trainees_profiles ? [action.payload] : [...state.trainees_profiles, action.payload],
                trainee_profile_success: true,
            };
        case UPDATE_TRAINEES_LIST:
            let new_trainees = state.trainees_profiles?.map(i => {
                if (action.payload.id === i.user._id) {
                    i.profile = action.payload.profile;
                }
            })
            return {
                ...state,
                loading: false,
                trainees_profiles: new_trainees
            };
        case DELETE_TRAINEE:
            return {
                ...state,
                loading: false,
                trainees_profiles: state.trainees_profiles.filter(i => action.payload.id !== i.user._id)
            };

        default:
            return state;
    }
}