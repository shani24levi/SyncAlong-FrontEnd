import {
    PROFILE_LOADING,
    SET_CURR_PROFILE,
    PROFILE_CREATE,
    SET_CURR_TRAINEES,
    TRINEE_PROFILE_CREATE,
    UPDATE_TRAINEES_LIST,
    DELETE_TRAINEE, UPDATE_PROFILE,
    TRAINEE_CREATE_SUCCESS,
} from '../actions/types';

const initialState = {
    loading: false,
    profile: null,
    trainees_profiles: [],
    trainee_profile_success: false,
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
            // console.log('action.payload', action.payload);
            if (action.payload.data.address) state.profile.address = action.payload.data.address;
            if (action.payload.data.phone) state.profile.phone = action.payload.data.phone
            if (action.payload.data.city) state.profile.city = action.payload.data.city
            if (action.payload.data.contry) state.profile.contry = action.payload.data.contry
            if (action.payload.data.age) state.profile.age = action.payload.data.age
            if (action.payload.data.gender) state.profile.gender = action.payload.data.gender
            if (action.payload.data.hobbies) state.profile.hobbies = action.payload.data.hobbies
            if (action.payload.data.about) state.profile.about = action.payload.data.about
            // console.log('state.profile', state.profile);

            return {
                ...state,
                loading: false,
            };

        case SET_CURR_TRAINEES:
            //console.log("SET_CURR_TRAINEES", action.payload);
            return {
                ...state,
                loading: false,
                trainees_profiles: !state.trainees_profiles ? [action.payload] : [...state.trainees_profiles, action.payload],
            }
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