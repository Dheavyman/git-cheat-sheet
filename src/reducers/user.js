import * as actionTypes from '../actions/actionTypes';

export const initialState = {
  user: {},
  isLoading: false,
  isLoggedIn: false,
  error: null,
};

const user = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.AUTH_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case actionTypes.AUTH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoggedIn: true,
        user: action.payload,
        error: null
      };
    case actionTypes.AUTH_FAILURE:
      return {
        ...state,
        isLoading: false,
        isLoggedIn: false,
        error: action.payload
      };
    case actionTypes.LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        user: {}
      };
    default:
      return state;
  }
};

export default user;
