import * as actionTypes from './actionTypes';
import * as actions from './users';

describe('Users action', () => {
  describe('authenticate user action creator', () => {
    const mockUser = {
      username: 'Anonymous',
      password: 'password',
    }
    const mockError = {
      message: 'Username already exist',
    }
    it('should create action for authentication request', () => {
      const expectedAction = {
        type: actionTypes.AUTH_REQUEST,
      };
      expect(actions.authRequest()).toEqual(expectedAction);
    });
    it('should create action for authentication success', () => {
      const expectedAction = {
        type: actionTypes.AUTH_SUCCESS,
        payload: mockUser
      };
      expect(actions.authSuccess(mockUser)).toEqual(expectedAction);
    });
    it('should create action for authentication failure', () => {
      const expectedAction = {
        type: actionTypes.AUTH_FAILURE,
        payload: mockError,
      };
      expect(actions.authFailure(mockError)).toEqual(expectedAction);
    });
  });
});
