import { LOGIN_SUCCESS, GET_CURR_USER, REGISTER_REQUEST, AUTH_LOADING } from '../actions/types';
import { createContext } from "react";

let user = localStorage.getItem('user');
const initialState = user ? { loggedIn: true, user, loading: false, resisterd: false } : { loading: false, resisterd: false };

export const AuthContext = createContext(initialState);

export default function (state = initialState, action) {
  switch (action.type) {
    case AUTH_LOADING:
      return {
        ...state,
        loading: action.payload
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

    default:
      return state;
  }
}