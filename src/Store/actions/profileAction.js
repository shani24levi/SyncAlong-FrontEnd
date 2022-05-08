import {
    GET_ERRORS,
    CLEAR_ERRORS,
    PROFILE_LOADING,
    SET_CURR_PROFILE,
    PROFILE_CREATE,
    UPDATE_PROFILE,
    SET_CURR_TRAINEES,
    TRINEE_PROFILE_CREATE,
    UPDATE_TRAINEES_LIST,
    DELETE_TRAINEE,
    SET_ALL_TRAINEES,
    CLEAR_PROFILE,
    UPDATE_AVATAR_TRAINEE
} from './types';
import { profileService } from '../../servises';
import { alertActions } from './alertActions';
import { seccesProfile } from './authAction';

export const createProfile = data => dispatch => {
    dispatch(setLoading(true));
    profileService.createProfile(data)
        .then(
            profile => {
                dispatch(success(profile));
                dispatch(alertActions.success('Profile created successfuly'));
                dispatch(seccesProfile(profile.data._id));
                dispatch(clear());
            },
            error => {
                dispatch(setLoading(false));
                dispatch(failure(error));
            }
        );
    function success(profile) { return { type: PROFILE_CREATE, payload: profile } }
};

export const updateProfile = (data) => dispatch => {
    dispatch(setLoading(true));
    profileService.update(data)
        .then(
            profile => {
                dispatch(success(profile));
                dispatch(alertActions.success('Profile updated successfuly'));
                dispatch(clear());
                return profile
            },
            error => {
                dispatch(setLoading(false));
                dispatch(failure(error));
            }
        );
    function success(profile) { return { type: UPDATE_PROFILE, payload: profile } }
};

export const setCurrentProfile = () => dispatch => {
    dispatch(setLoading(true));
    profileService.getProfile()
        .then(
            profile => {
                console.log('success get profile', profile.data);
                dispatch(success(profile.data));
                dispatch(clear());
            },
            error => {
                dispatch(setLoading(false));
                dispatch(failure(error));
            }
        );
    function success(profile) { return { type: SET_CURR_PROFILE, payload: profile } }
};

export const createTraineeProfile = (user, data) => dispatch => {
    dispatch(setLoading(true));
    profileService.createTraineeProfile(user._id, data)
        .then(
            profile => {
                dispatch(success(user, profile));
                dispatch(alertActions.success('Profile created successfuly'));
                dispatch(clear());
            },
            error => {
                dispatch(setLoading(false));
                dispatch(failure(error));
            }
        );
    function success(user, profile) { return { type: TRINEE_PROFILE_CREATE, payload: { user, profile } } }
};
export const getTraineesProfiles = (trainees_arr) => dispatch => {
    dispatch(setLoading(true));
    for (const id in trainees_arr) {
        profileService.getTraineeProfile(trainees_arr[id]._id)
            .then(
                profile => {
                    dispatch(success(trainees_arr[id], profile));
                    dispatch(clear());
                },
                error => {
                    dispatch(setLoading(false));
                    dispatch(failure(error));
                }
            );
    }
    function success(id, profile) { return { type: SET_CURR_TRAINEES, payload: { id, profile } } }
}

export const getAllTraineesProfiles = () => dispatch => {
    dispatch(setLoading(true));
    profileService.getAllTraineesProfiles()
        .then(
            profile => {
                console.log('profile s', profile);
                dispatch(success(profile));
                dispatch(clear());
            },
            error => {
                //dispatch(setLoading(false));
                dispatch(fail());
            }
        );
    function success(profile) { return { type: SET_ALL_TRAINEES, payload: profile } }
    function fail() { return { type: SET_ALL_TRAINEES, payload: [] } }
}

export const updateAvatarTraineePic = (data, id) => dispatch => {
    dispatch(setLoading(true));
    profileService.updateAvatarTraineePic(data, id)
        .then(
            url => {
                console.log('url.data.data', url.data.data);
                dispatch(success(url.data.data, id));
            },
            error => {
                console.log('error', error.response);
                dispatch(setLoading(false));
                dispatch(failure(error));
            }
        );
    function success(url, id) { return { type: UPDATE_AVATAR_TRAINEE, payload: { url, id } } }
}


// export const setTraineeProfileById = (id, data) => dispatch => {
//     return { type: UPDATE_TRAINEES_LIST, payload: { id, profile } }
// }
// export const updateTraineeProfile = (id, data) => dispatch => {
//     dispatch(setLoading(true));
//     profileService.updateTraineeProfile(id, data)
//         .then(
//             profile => {
//                 setTraineeProfileById(id, profile)
//                 return profile
//             },
//             error => {
//                 dispatch(setLoading(false));
//                 dispatch(failure(error));
//             }
//         );
// };

// export const deleteTraineeProfile = (id) => dispatch => {
//     dispatch(setLoading(true));
//     profileService.deleteTraineeProfile(id)
//         .then(
//             profile => {
//                 dispatch(success(id))
//             },
//             error => {
//                 dispatch(setLoading(false));
//                 dispatch(failure(error));
//             }
//         );
//     function success(id) { return { type: DELETE_TRAINEE, payload: id } }
// };
function failure(error) { return { type: GET_ERRORS, payload: error.error } }
function clear(eror) { return { type: CLEAR_ERRORS } }


export const clearLogoutProfile = () => { return { type: CLEAR_PROFILE }; };

export const setLoading = (val) => {
    return {
        type: PROFILE_LOADING,
        payload: val
    };
};