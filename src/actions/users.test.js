import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';

import * as actionTypes from './actionTypes';
import * as actions from './users';

const middleware = [thunk]
const mockStore = configureMockStore(middleware)

describe('Users action', () => {
  const mockUser = {
    username: 'Anonymous',
    password: 'password',
  }
  const mockError = {
    message: 'Username already exist',
  }

  describe('authenticate user action creator', () => {
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

  describe('authenticate user async actions', () => {
    afterEach(() => {
      fetchMock.restore()
    });

    it('should register user and dispatch AUTH_SUCCESS action', (done) => {
      fetchMock.postOnce('http://127.0.0.1:8800/api/v1/auth/signup', {
        body: { data: { username: 'Anonymous', token: 'token' } },
        headers: { 'content-type': 'application/json' }
      });

      const expectedActions = [
        actions.authRequest(),
        actions.authSuccess({ username: 'Anonymous', token: 'token' })
      ];

      const store = mockStore({});

      return store.dispatch(actions.authenticate(mockUser, 'Register'))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
    });

    it('should login user and dispatch AUTH_SUCCESS action', (done) => {
      fetchMock.postOnce('http://127.0.0.1:8800/api/v1/auth/login', {
        body: { data: { username: 'Anonymous', token: 'token' } },
        headers: { 'content-type': 'application/json' }
      });

      const expectedActions = [
        actions.authRequest(),
        actions.authSuccess({ username: 'Anonymous', token: 'token' })
      ];

      const store = mockStore({});

      return store.dispatch(actions.authenticate(mockUser, 'Login'))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
    });

    it('should dispatch LOGOUT action', (done) => {
      const expectedActions = [{
        type: actionTypes.LOGOUT,
      }];

      const store = mockStore({});

      return store.dispatch(actions.logout())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
    });
  });
});
