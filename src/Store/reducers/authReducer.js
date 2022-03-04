import {
  LOGIN_SUCCESS,
  LOGOUT,
  GET_CURR_USER,
  REGISTER_REQUEST,
  AUTH_LOADING,
  TRAINEE_CREATE_SUCCESS,
  TRAINEE_UPDATE_SUCCESS,
  TRAINEE_DELETE,
  UPDATE_AVATAR,
  UPDATE_USER
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
    case LOGOUT:
      return {
        ...state,
        user: {},
        loggedIn: false,
        loading: false,
        resisterd: false
      };
    case LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.payload,
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
      console.log(state.user);
      return {
        ...state,
        loading: false,
      };

    case TRAINEE_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        trainees: [...action.payload._id] //list of my tariness 
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
        //trainees: trainees.filter(i => i != action.payload._id)
      };
    case UPDATE_AVATAR:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
}