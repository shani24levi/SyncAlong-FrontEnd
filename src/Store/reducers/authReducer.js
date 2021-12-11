import { FETCH_POSTS, NEW_POST } from '../actions/types';

const initialState = {
  user: {},
  isAuthenticated: false,
  isAdmin: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_POSTS:
      console.log('fatching reduser');
      return {
        ...state,
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