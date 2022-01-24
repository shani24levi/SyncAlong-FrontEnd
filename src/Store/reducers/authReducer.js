import { LOGIN_SUCCESS, GET_CURR_USER, REGISTER_REQUEST, AUTH_LOADING } from '../actions/types';

let user = localStorage.getItem('user');
const initialState = user ? { loggedIn: true, user, loading: false } : { loading: false };

// const initialState = {
//   user: {},
//   resisterd: false,
//   loggedIn: false,
// };

export default function (state = initialState, action) {
  switch (action.type) {
    case AUTH_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    case LOGIN_SUCCESS:
      return {
        loggingIn: true,
        user: action.payload,
        loading: false,
      };
    case GET_CURR_USER:
      return {
        user: user,
        loading: false,
      };
    case REGISTER_REQUEST:
      console.log('jjjjjj', state);
      return {
        ...state,
        resisterd: true,
        loading: false,
      };

    default:
      return state;
  }
}