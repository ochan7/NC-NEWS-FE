import {expect} from 'chai';
import getCommentsReducer, {initialState} from '../src/reducers/getComments';
import {
  fetchCommentsFailure,
  fetchCommentsRequest,
  fetchCommentsSuccess
} from '../src/actions/getComments';

describe('comments reducer', () => {
  const article_id = '5a033990e03644b9fab5289c';
  describe('default behaviour', () => {
    it('returns the passed previous state if an unrecognised action is passed', () => {
      const action = {type: 'whatever'};
      const newState = getCommentsReducer(initialState, action);
      expect(newState).to.equal(initialState);
    });
    it('uses the initial state if no previous state is passed', () => {
      const action = {type: 'whatever'};
      const newState = getCommentsReducer(undefined, action);
      expect(newState).to.equal(initialState);
    });
  });
  it('handles FETCH_COMMENTS_REQUEST', () => {
    const action = fetchCommentsRequest(article_id);
    const newState = getCommentsReducer(undefined, action);
    expect(newState.loading).to.be.true;
    expect(newState.error).to.be.null;
    expect(newState.data).to.eql([]);
  });
  it('handles FETCH_COMMENTS_SUCCESS', () => {
    const prevState = getCommentsReducer(undefined, fetchCommentsRequest(article_id));
    const data = [1,2,3];
    const action = fetchCommentsSuccess(data);
    const newState = getCommentsReducer(prevState, action);
    expect(newState.loading).to.be.false;
    expect(newState.error).to.be.null;
    expect(newState.data).to.eql(data);
  });
  it('handles FETCH_COMMENTS_FAILURE', () => {
    const prevState = getCommentsReducer(undefined, fetchCommentsRequest());
    const error = 'Something went wrong';
    const action = fetchCommentsFailure(error);
    const newState = getCommentsReducer(prevState, action);
    expect(newState.loading).to.be.false;
    expect(newState.error).to.eql(error);
    expect(newState.data).to.eql([]);
  });
});