import * as actionTypes from './actionTypes';
import * as actions from './cheats';

describe('Cheats action', () => {
  describe('fetch cheats action creator', () => {
    const mockCheats = [{
      _id: 'cheat id',
      description: 'cheat description',
      command: 'cheat command'
    }];
    const mockError = {
      message: 'Error fetching cheats'
    }
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
});
