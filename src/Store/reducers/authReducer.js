import {
  LOGIN_SUCCESS,
  GET_CURR_USER,
  REGISTER_REQUEST,
  AUTH_LOADING,
  TRAINEE_CREATE_SUCCESS,
  TRAINEE_UPDATE_SUCCESS,
  TRAINEE_DELETE,
  UPDATE_AVATAR,
  UPDATE_USER,
  CLEAR_AUTH,
  AUTH_PROFILE,
} from '../actions/types';

let user = localStorage.getItem('user');
const initialState = user ? { loggedIn: true, user, loading: false, resisterd: false } : { loading: false, resisterd: false };

export default function (state = initialState, action) {
  switch (action.type) {
    case AUTH_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    case CLEAR_AUTH:
      return {
        user: {},
        loading: false,
        resisterd: false
      };
    case LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.payload,
        loading: false,
      };
    case AUTH_PROFILE:
      state.user.profile_id = action.payload
      return {
        ...state,
        loading: false,
      };
    case GET_CURR_USER:
      return {
        user: user,
        loading: false,
      };
    case REGISTER_REQUEST:
      return {
        ...state,
        resisterd: true,
        loading: false,
      };
    case UPDATE_USER:
      console.log(action.payload);
      state.user.name = action.payload.user;
      return {
        ...state,
        loading: false,
      };
    case TRAINEE_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case TRAINEE_DELETE:
      return {
        ...state,
        loading: false,
      };
    case UPDATE_AVATAR:
      state.user.avatar = action.payload.data;
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
}