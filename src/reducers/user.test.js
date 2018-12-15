import user, { initialState } from './user';
import * as actionTypes from '../actions/actionTypes';

describe('User reducer', () => {
  it('should return the default initial state', () => {
    expect(user(initialState, {})).toEqual(initialState);
  });

  describe('fetch cheats', () => {
    it('should handle authentication request', () => {
      const action = {
        type: actionTypes.AUTH_REQUEST,
      };
      expect(user(initialState, action)).toEqual({
        ...initialState,
        isLoading: true,
        error: null
      });
    });

    it('should handle authentication success', () => {
      const action = {
        type: actionTypes.AUTH_SUCCESS,
        payload: {
          username: 'Anonymous',
          token: 'token'
        }
      };
      expect(user(initialState, action)).toEqual({
        ...initialState,
        isLoading: false,
        isLoggedIn: true,
        user: action.payload,
        error: null
      });
    });

    it('should handle authentication failure', () => {
      const action = {
        type: actionTypes.AUTH_FAILURE,
        payload: 'Username already exist'
      };
      expect(user(initialState, action)).toEqual({
        ...initialState,
        isLoading: false,
        isLoggedIn: false,
        error: action.payload
      });
    });

    it('should handle user logout', () => {
      const state = {
        ...initialState,
        isLoggedIn: true,
        user: {
          username: 'Anonymous',
          token: 'token'
        }
      };
      const action = {
        type: actionTypes.LOGOUT,
      };
      expect(user(state, action)).toEqual({
        ...state,
        isLoggedIn: false,
        user: {}
      });
    });
  });
});
