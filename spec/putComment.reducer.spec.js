import {expect} from 'chai';
import putCommentReducer, {initialState} from '../src/reducers/putComment';
import {
  putCommentFailure,
  putCommentRequest,
  putCommentSuccess
} from '../src/actions/putComment';

describe('putComment reducer', () => {
  const comment_id = '5a033992e03644b9fab528c0';
  describe('default behaviour', () => {
    it('returns the passed previous state if an unrecognised action is passed', () => {
      const action = {type: 'whatever'};
      const newState = putCommentReducer(initialState, action);
      expect(newState).to.equal(initialState);
    });
    it('uses the initial state if no previous state is passed', () => {
      const action = {type: 'whatever'};
      const newState = putCommentReducer(undefined, action);
      expect(newState).to.equal(initialState);
    });
  });
  it('handles the PUT_COMMENT_REQUEST', () => {
    const vote = 'down';
    const action = putCommentRequest(comment_id, vote);
    const newState = putCommentReducer(undefined, action);
    expect(newState.loading).to.be.true;
    expect(newState.error).to.be.null;
    expect(newState.data).to.eql([]);
  });
  it('handles the PUT_COMMENT_SUCCESS', () => {
    const vote = 'down';
    const prevState = putCommentReducer(undefined, putCommentRequest(comment_id, vote));
    const data = [1, 2, 3];
    const action = putCommentSuccess(data);
    const newState = putCommentReducer(prevState, action);
    expect(newState.loading).to.be.false;
    expect(newState.error).to.be.null;
    expect(newState.data).to.eql(data);
  });
  it('handles the PUT_COMMENT_FAILURE', () => {
    const prevState = putCommentReducer(undefined, putCommentRequest());
    const error = 'Something went wrong';
    const action = putCommentFailure(error);
    const newState = putCommentReducer(prevState, action);
    expect(newState.loading).to.be.false;
    expect(newState.error).to.eql(error);
    expect(newState.data).to.eql([]);
  });
});