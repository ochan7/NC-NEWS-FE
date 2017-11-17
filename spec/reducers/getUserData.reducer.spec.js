import {expect} from 'chai';
import getUserDataReducer, {initialState} from '../../src/reducers/getUserData';

import {
  getUserDataFailure,
  getUserDataRequest,
  getUserDataSuccess
} from '../../src/actions/getUserData';

describe('getUserData reducer', () => {
  const username = 'tickle122';
  describe('default behaviour', () => {
    it('returns the passed previous state if an unrecognised action is passed', () => {
      const action = {type: 'whatever'};
      const newState = getUserDataReducer(initialState, action);
      expect(newState).to.equal(initialState);
    });
    it('uses the initial state if no previous state is passed', () => {
      const action = {type: 'whatever'};
      const newState = getUserDataReducer(undefined, action);
      expect(newState).to.equal(initialState);
    });
  });
  it('handles GET_USER_DATA_REQUEST', () => {
    const action = getUserDataRequest(username);
    const newState = getUserDataReducer(undefined, action);
    expect(newState.loading).to.be.true;
    expect(newState.error).to.be.null;
    expect(newState.data).to.eql([]);
  });
  it('handles GET_USER_DATA_SUCCESS', () => {
    const prevState = getUserDataReducer(undefined, getUserDataRequest(username));
    const data = [1];
    const action = getUserDataSuccess(data);
    const newState = getUserDataReducer(prevState, action);
    expect(newState.loading).to.be.false;
    expect(newState.error).to.be.null;
    expect(newState.data).to.eql(data);
  });
  it('handles GET_USER_DATA_FAILURE', () => {
    const prevState = getUserDataReducer(undefined, getUserDataRequest());
    const error = 'USERNAME NOT FOUND';
    const action = getUserDataFailure(error);
    const newState = getUserDataReducer(prevState, action);
    expect(newState.loading).to.be.false;
    expect(newState.error).to.eql(error);
    expect(newState.data).to.eql([]);
  });
});