import {expect} from 'chai';
import postCommentReducer, {initialState} from '../src/reducers/postComment';
import {
  postCommentFailure,
  postCommentRequest,
  postCommentSuccess
} from '../src/actions/postComment';

describe.only('postComment reducer', () => {
  const article_id = '5a033990e03644b9fab5289c';
  const comment = 'this is a comment';
  describe('default behaviour', () => {
    it('returns the passed previous state if an unrecognised action is passed', () => {
      const action = {type: 'whatever'};
      const newState = postCommentReducer(initialState, action);
      expect(newState).to.equal(initialState);
    });
    it('uses the initial state if no previous state is passed', () => {
      const action = {type: 'whatever'};
      const newState = postCommentReducer(undefined, action);
      expect(newState).to.equal(initialState);
    });
  });
  it('handles the POST_COMMENT_REQUEST', () => {
    const action = postCommentRequest(article_id, comment);
    const newState = postCommentReducer(undefined, action);
    expect(newState.loading).to.be.true;
    expect(newState.error).to.be.null;
    expect(newState.data).to.eql([]);
  });

});