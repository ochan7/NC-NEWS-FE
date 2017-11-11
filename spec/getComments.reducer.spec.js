import {expect} from 'chai';
import getCommentsReducer, {initialState} from '../src/reducers/getComments';
import {
  getCommentsFailure,
  getCommentsRequest,
  getCommentsSuccess
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
  it('handles GET_COMMENTS_REQUEST', () => {
    const action = getCommentsRequest(article_id);
    const newState = getCommentsReducer(undefined, action);
    expect(newState.loading).to.be.true;
    expect(newState.error).to.be.null;
    expect(newState.data).to.eql([]);
  });
  it('handles GET_COMMENTS_SUCCESS', () => {
    const prevState = getCommentsReducer(undefined, getCommentsRequest(article_id));
    const data = [1,2,3];
    const action = getCommentsSuccess(data);
    const newState = getCommentsReducer(prevState, action);
    expect(newState.loading).to.be.false;
    expect(newState.error).to.be.null;
    expect(newState.data).to.eql(data);
  });
  it('handles GET_COMMENTS_FAILURE', () => {
    const prevState = getCommentsReducer(undefined, getCommentsRequest());
    const error = 'Something went wrong';
    const action = getCommentsFailure(error);
    const newState = getCommentsReducer(prevState, action);
    expect(newState.loading).to.be.false;
    expect(newState.error).to.eql(error);
    expect(newState.data).to.eql([]);
  });
});