import {expect} from 'chai';
import commentsReducer, {initialState} from '../src/reducers/comments';
import {
  fetchCommentsFailure,
  fetchCommentsRequest,
  fetchCommentsSuccess
} from '../src/actions/comments';

describe.only('comments reducer', () => {
  describe('default behaviour', () => {
    it('returns the passed previous state if an unrecognised action is passed', () => {
      const action = {type: 'whatever'};
      const newState = commentsReducer(initialState, action);
      expect(newState).to.equal(initialState);
    });
    it('uses the initial state if no previous state is passed', () => {
      const action = {type: 'whatever'};
      const newState = commentsReducer(undefined, action);
      expect(newState).to.equal(initialState);
    });
  });
  it('handles FETCH_COMMENTS_REQUEST', () => {
    const article_id = '5a033990e03644b9fab5289c';
    const action = fetchCommentsRequest(article_id);
    const newState = commentsReducer(undefined, action);
    expect(newState.loading).to.be.true;
    expect(newState.error).to.be.null;
    expect(newState.data).to.eql([]);
  });
});