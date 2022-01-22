import { LOGIN_SUCCESS, GET_CURR_USER } from '../actions/types';

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
    case GET_CURR_USER:
      return {
        user: user
      };

    default:
      return state;
  }
}