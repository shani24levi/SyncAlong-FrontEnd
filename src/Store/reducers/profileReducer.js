import {
    PROFILE_LOADING,
    SET_CURR_PROFILE,
    PROFILE_CREATE,
    TRINEE_PROFILE_CREATE,
    UPDATE_TRAINEES_LIST,
    DELETE_TRAINEE, UPDATE_PROFILE,
    TRAINEE_CREATE_SUCCESS,
} from '../actions/types';

const initialState = {
    loading: false,
    profile: null,
    trainees_profiles: [],
    trainee_profile_success: false
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
        case UPDATE_PROFILE:
            console.log('action.payload', action.payload);
            if (action.payload.address) state.profile.address = action.payload.address;
            if (action.payload.phone) state.profile.phone = action.payload.phone
            if (action.payload.city) state.profile.city = action.payload.city
            if (action.payload.contry) state.profile.contry = action.payload.contry
            if (action.payload.age) state.profile.age = action.payload.age
            if (action.payload.gender) state.profile.gender = action.payload.gender
            if (action.payload.hobbies) state.profile.hobbies = action.payload.hobbies
            if (action.payload.about) state.profile.about = action.payload.about
            console.log(')state.profile', state.profile);

            return {
                ...state,
                loading: false,
            };


        case TRAINEE_CREATE_SUCCESS:
            state.profile?.trainerOf?.push(action.payload.data?._id) //add to the caurr list state
            return {
                ...state,
                loading: false,
                trinee_added: action.payload.data,
                trainee_profile_success: false,
            };
        case TRINEE_PROFILE_CREATE:
            return {
                ...state,
                loading: false,
                trainees_profiles: !state.trainees_profiles ? [action.payload] : [...state.trainees_profiles, action.payload],
                trainee_profile_success: true,
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