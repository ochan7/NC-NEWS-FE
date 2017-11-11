import {expect} from 'chai';
import getUserReducer, {initialState} from '../src/reducers/getUser';

import {
  getUserFailure,
  getUserRequest,
  getUserSuccess
} from '../src/actions/getUser';

describe('getUser reducer', () => {
  const username = 'tickle122';
  describe('default behaviour', () => {
    it('returns the passed previous state if an unrecognised action is passed', () => {
      const action = {type: 'whatever'};
      const newState = getUserReducer(initialState, action);
      expect(newState).to.equal(initialState);
    });
    it('uses the initial state if no previous state is passed', () => {
      const action = {type: 'whatever'};
      const newState = getUserReducer(undefined, action);
      expect(newState).to.equal(initialState);
    });
  });
  it('handles GET_USER_REQUEST', () => {
    const action = getUserRequest(username);
    const newState = getUserReducer(undefined, action);
    expect(newState.loading).to.be.true;
    expect(newState.error).to.be.null;
    expect(newState.data).to.eql([]);
  });
});