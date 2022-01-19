import { FETCH_POSTS, NEW_POST, LOGIN_SUCCESS, LOGIN_FAILURE } from '../actions/types';

//console.log('local ', JSON.parse(localStorage.getItem('user')));
let user = localStorage.getItem('user');
const initialState = user ? { loggedIn: true, user } : {};

// const initialState = {
//   user: {},
//   isAuthenticated: false,
//   isAdmin: false,
// };

export default function (state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        loggingIn: true,
        user: action.payload
      };

    case FETCH_POSTS:
      console.log('fatching reduser');
      return {
        ...state,
        loggingIn: true,
        user: action.payload
      };
    case NEW_POST:
      return {
        ...state,
        user: action.payload
      };
    default:
      return state;
  }
}