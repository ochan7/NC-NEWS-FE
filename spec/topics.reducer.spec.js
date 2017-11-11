import {expect} from 'chai';
import topicsReducer, {initialState} from '../src/reducers/topics';
import {
  fetchTopicsFailure,
  fetchTopicsRequest,
  fetchTopicsSuccess
} from '../src/actions/topics';

describe('topics reducer', () => {
  describe('default behaviour', () => {
    it('returns the passed previous state if an unrecognised action is passed', () => {
      const action = {type: 'whatever'};
      const newState = topicsReducer(initialState, action);
      expect(newState).to.equal(initialState);
    });
    it('uses the initial state if no previous state is passed', () => {
      const action = {type: 'whatever'};
      const newState = topicsReducer(undefined, action);
      expect(newState).to.equal(initialState);
    });
  });
});