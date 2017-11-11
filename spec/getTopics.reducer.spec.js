import {expect} from 'chai';
import getTopicsReducer, {initialState} from '../src/reducers/getTopics';
import {
  getTopicsFailure,
  getTopicsRequest,
  getTopicsSuccess
} from '../src/actions/getTopics';

describe('topics reducer', () => {
  describe('default behaviour', () => {
    it('returns the passed previous state if an unrecognised action is passed', () => {
      const action = {type: 'whatever'};
      const newState = getTopicsReducer(initialState, action);
      expect(newState).to.equal(initialState);
    });
    it('uses the initial state if no previous state is passed', () => {
      const action = {type: 'whatever'};
      const newState = getTopicsReducer(undefined, action);
      expect(newState).to.equal(initialState);
    });
  });
});