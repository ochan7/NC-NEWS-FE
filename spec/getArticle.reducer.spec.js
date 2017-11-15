import {expect} from 'chai';
import getArticleReducer, {initialState} from '../src/reducers/getArticle';
import {
  getArticleRequest,
  getArticleSuccess,
  getArticleFailure
} from '../src/actions/getArticle';

describe('article reducer', () => {
  describe('default behaviour', () => {
    it('returns the passed previous state if an unrecognised action is passed', () => {
      const action = {type: 'whatever'};
      const newState = getArticleReducer(initialState, action);
      expect(newState).to.equal(initialState);
    });
    it('uses the initial state if no previous state is passed', () => {
      const action = {type: 'whatever'};
      const newState = getArticleReducer(undefined, action);
      expect(newState).to.equal(initialState);
    });
  });
  it('handles GET_ARTICLE_REQUEST', () => {
    const action = getArticleRequest('adadadfaf');
    const newState = getArticleReducer(undefined, action);
    expect(newState.loading).to.be.true;
    expect(newState.error).to.be.null;
    expect(newState.data).to.eql([]);
  });
  it('handles GET_ARTICLE_SUCCESS', () => {
    const prevState = getArticleReducer(undefined, getArticleRequest('asdfadsf'));
    const data = [1, 2, 3];
    const action = getArticleSuccess(data);
    const newState = getArticleReducer(prevState, action);
    expect(newState.loading).to.be.false;
    expect(newState.error).to.be.null;
    expect(newState.data).to.eql(data);
  });
  it('handles GET_ARTICLE_FAILURE', () => {
    const prevState = getArticleReducer(undefined, getArticleRequest());
    const error = 'Something went wrong';
    const action = getArticleFailure(error);
    const newState = getArticleReducer(prevState, action);
    expect(newState.loading).to.be.false;
    expect(newState.error).to.eql(error);
    expect(newState.data).to.eql([]);
  });
});
