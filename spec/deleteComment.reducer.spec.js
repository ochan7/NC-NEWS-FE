import {expect} from 'chai';
import deleteCommentReducer, {initialState} from '../src/reducers/deleteComment';
import {
  deleteCommentFailure,
  deleteCommentRequest,
  deleteCommentSuccess
} from '../src/actions/deleteComment';

describe('deleteComment reducer', () => {
  const comment_id = '5a033992e03644b9fab528c0';
  describe.only('default behaviour', () => {
    it('returns the passed previous state if an unrecognised action is passed', () => {
      const action = {type: 'whatever'};
      const newState = deleteCommentReducer(initialState, action);
      expect(newState).to.equal(initialState);
    });
    it('uses the initial state if no previous state is passed', () => {
      const action = {type: 'whatever'};
      const newState = deleteCommentReducer(undefined, action);
      expect(newState).to.equal(initialState);
    });
  });
  it('handles the DELETE_COMMENT_REQUEST', () => {
    const action = deleteCommentRequest(comment_id);
    const newState = deleteCommentReducer(undefined, action);
    expect(newState.loading).to.be.true;
    expect(newState.error).to.be.null;
    expect(newState.data).to.eql([]);
  });
  it('handles the DELETE_COMMENT_SUCCESS', () => {
    const prevState = deleteCommentReducer(undefined, deleteCommentRequest(comment_id));
    const data = [1, 2, 3];
    const action = deleteCommentSuccess(data);
    const newState = deleteCommentReducer(prevState, action);
    expect(newState.loading).to.be.false;
    expect(newState.error).to.be.null;
    expect(newState.data).to.eql(data);
  });
  it('handles the DELETE_COMMENT_FAILURE', () => {
    const prevState = deleteCommentReducer(undefined, deleteCommentRequest());
    const error = 'Something went wrong';
    const action = deleteCommentFailure(error);
    const newState = deleteCommentReducer(prevState, action);
    expect(newState.loading).to.be.false;
    expect(newState.error).to.eql(error);
    expect(newState.data).to.eql([]);
  });
});