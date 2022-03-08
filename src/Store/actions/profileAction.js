import {
    GET_ERRORS,
    PROFILE_LOADING,
    SET_CURR_PROFILE,
    PROFILE_CREATE,
    UPDATE_PROFILE,
    SET_CURR_TRAINEES,
    TRINEE_PROFILE_CREATE,
    UPDATE_TRAINEES_LIST,
    DELETE_TRAINEE
} from './types';
import { profileService } from '../../servises';
import { alertActions } from './alertActions';

export const createProfile = data => dispatch => {
    dispatch(setLoading(true));
    console.log(data);
    profileService.createProfile(data)
        .then(
            profile => {
                dispatch(success(profile));
                dispatch(alertActions.success('Profile created successfuly'));
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
                return profile
            },
            error => {
                dispatch(setLoading(false));
                dispatch(failure(error));
            }
        );
    function success(profile) { return { type: UPDATE_PROFILE, payload: profile } }
};

// export const setCurrentProfile = user => { return { type: SET_CURR_PROFILE, payload: user } }

export const setCurrentProfile = () => dispatch => {
    dispatch(setLoading(true));
    profileService.getProfile()
        .then(
            profile => {
                console.log(profile);
                dispatch(success(profile.data));
            },
            error => {
                dispatch(setLoading(false));
                dispatch(failure(error));
            }
        );
    function success(profile) { return { type: SET_CURR_PROFILE, payload: profile } }
};

export const createTraineeProfile = (id, data) => dispatch => {
    dispatch(setLoading(true));
    profileService.createTraineeProfile(id, data)
        .then(
            profile => {
                dispatch(success(id, profile));
                dispatch(alertActions.success('Profile created successfuly'));
            },
            error => {
                dispatch(setLoading(false));
                dispatch(failure(error));
            }
        );
    function success(id, profile) { return { type: TRINEE_PROFILE_CREATE, payload: { id, profile } } }
};
export const getTraineesProfiles = (trainees_arr) => dispatch => {
    console.log("getTraineesProfiles", "here");
    for (const id in trainees_arr) {
        dispatch(setLoading(true));
        console.log(id, trainees_arr[id])
        profileService.getTraineeProfile(trainees_arr[id])
            .then(
                profile => {
                    console.log(id, profile);
                    dispatch(success(trainees_arr[id], profile));
                },
                error => {
                    dispatch(setLoading(false));
                    dispatch(failure(error));
                }
            );
    }
    function success(id, profile) { return { type: SET_CURR_TRAINEES, payload: { id, profile } } }
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

export const setLoading = (val) => {
    return {
        type: PROFILE_LOADING,
        payload: val
    };
};