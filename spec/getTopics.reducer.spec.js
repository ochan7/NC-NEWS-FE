import {expect} from 'chai';
import getTopicsReducer, {initialState} from '../src/reducers/getTopics';
import {
  getTopicsFailure,
  getTopicsRequest,
  getTopicsSuccess
} from '../src/actions/getTopics';

describe.only('topics reducer', () => {
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
  it('handles GET_TOPICS_REQUEST', () => {
    const action = getTopicsRequest();
    const newState = getTopicsReducer(undefined, action);
    expect(newState.loading).to.be.true;
    expect(newState.error).to.be.null;
    expect(newState.data).to.eql([]);
  });
  it('handles GET_ARTICLES_SUCCESS', () => {
    const prevState = getTopicsReducer(undefined, getTopicsRequest());
    const data = [1, 2, 3];
    const action = getTopicsSuccess(data);
    const newState = getTopicsReducer(prevState, action);
    expect(newState.loading).to.be.false;
    expect(newState.error).to.be.null;
    expect(newState.data).to.eql(data);
  });
});