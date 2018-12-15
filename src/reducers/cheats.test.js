import cheats, { initialState } from './cheats';
import * as actionTypes from '../actions/actionTypes';

describe('Cheats reducer', () => {
  it('should return the default initial state', () => {
    expect(cheats(initialState, {})).toEqual(initialState);
  });

  describe('fetch cheats', () => {
    it('should handle fetch cheats success', () => {
      const action = {
        type: actionTypes.FETCH_CHEATS_SUCCESS,
        payload: [{
          _id: 'cheat id',
          category: 'cheat category',
          description: 'cheat description',
          command: 'cheat command',
          keywords: []
        }]
      };
      expect(cheats(initialState, action)).toEqual({
        ...initialState,
        cheats: action.payload,
        error: null
      });
    });

    it('should handle fetch cheats failure', () => {
      const action = {
        type: actionTypes.FETCH_CHEATS_FAILURE,
        payload: 'Error fetching cheats'
      };
      expect(cheats(initialState, action)).toEqual({
        ...initialState,
        error: action.payload
      });
    });

    it('should handle search cheats', () => {
      const state = {
        ...initialState,
        cheats: [{
          _id: 'cheat id',
          category: 'Install git',
          description: 'Install git in your system',
          command: 'cheat command',
          keywords: []
        }, {
          _id: 'cheat id',
          category: 'Make changes',
          description: 'check status',
          command: 'cheat command',
          keywords: ['status']
        }],
        searchResult: []
      }
      const action = {
        type: actionTypes.SEARCH_CHEATS,
        payload: 'status'
      };
      expect(cheats(state, action)).toEqual({
        ...state,
        searchResult: [{
          _id: 'cheat id',
          category: 'Make changes',
          description: 'check status',
          command: 'cheat command',
          keywords: ['status']
        }],
        keywords: 'status',
        error: null
      });
    });
  });
});
