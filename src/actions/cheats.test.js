import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';

import * as actionTypes from './actionTypes';
import * as actions from './cheats';

const middleware = [thunk]
const mockStore = configureMockStore(middleware)

describe('Cheats action', () => {
  const mockCheats = [{
    _id: 'cheat id',
    description: 'cheat description',
    command: 'cheat command'
  }];
  const mockError = {
    message: 'Error fetching cheats'
  }
  describe('fetch cheats action creator', () => {
    it('should create action for fetch cheats success', () => {
      const expectedAction = {
        type: actionTypes.FETCH_CHEATS_SUCCESS,
        payload: mockCheats
      };
      expect(actions.fetchCheatsSuccess(mockCheats)).toEqual(expectedAction);
    });
    it('should create action for fetch cheats failure', () => {
      const expectedAction = {
        type: actionTypes.FETCH_CHEATS_FAILURE,
        payload: mockError
      };
      expect(actions.fetchCheatsFailure(mockError)).toEqual(expectedAction);
    });
  });

  describe('fetch cheats async actions', () => {
    afterEach(() => {
      fetchMock.restore()
    });

    it('should fetch cheats and dispatch FETCH_CHEATS_SUCCESS action', (done) => {
      fetchMock.getOnce('http://127.0.0.1:8800/api/v1/cheats', {
        body: { data: { cheats: mockCheats } },
        headers: { 'content-type': 'application/json' }
      });

      const expectedActions = [{
        type: actionTypes.FETCH_CHEATS_SUCCESS,
        payload: mockCheats
      }];

      const store = mockStore({});

      return store.dispatch(actions.fetchCheats())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
    });

    it('should fetch cheats and dispatch FETCH_CHEATS_FAILURE action', (done) => {
      fetchMock.getOnce('http://127.0.0.1:8800/api/v1/cheats', {
        status: 400,
        body: { message: 'Error message' },
        headers: { 'content-type': 'application/json' }
      });

      const expectedActions = [{
        type: actionTypes.FETCH_CHEATS_FAILURE,
        payload: 'Bad Request'
      }];

      const store = mockStore({});

      return store.dispatch(actions.fetchCheats())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
    });

    it('should dispatch SEARCH_CHEATS action', (done) => {
      const expectedActions = [{
        type: actionTypes.SEARCH_CHEATS,
        payload: 'status'
      }];

      const store = mockStore({});

      return store.dispatch(actions.handleSearch('status'))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
    });
  });
});
