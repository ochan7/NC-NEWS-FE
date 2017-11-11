import {expect} from 'chai';
import getArticlesReducer, {initialState} from '../src/reducers/getArticles';
import {
  fetchArticlesRequest,
  fetchArticlesSuccess,
  fetchArticlesFailure
} from '../src/actions/getArticles';

describe('articles reducer', () => {
  describe('default behaviour', () => {
    it('returns the passed previous state if an unrecognised action is passed', () => {
      const action = {type: 'whatever'};
      const newState = getArticlesReducer(initialState, action);
      expect(newState).to.equal(initialState);
    });
    it('uses the initial state if no previous state is passed', () => {
      const action = {type: 'whatever'};
      const newState = getArticlesReducer(undefined, action);
      expect(newState).to.equal(initialState);
    });
  });
  it('handles FETCH_ARTICLES_REQUEST', () => {
    const action = fetchArticlesRequest();
    const newState = getArticlesReducer(undefined, action);
    expect(newState.loading).to.be.true;
    expect(newState.error).to.be.null;
    expect(newState.data).to.eql([]);
  });
  it('handles FETCH_ARTICLES_SUCCESS', () => {
    const prevState = getArticlesReducer(undefined, fetchArticlesRequest());
    const data = [1, 2, 3];
    const action = fetchArticlesSuccess(data);
    const newState = getArticlesReducer(prevState, action);
    expect(newState.loading).to.be.false;
    expect(newState.error).to.be.null;
    expect(newState.data).to.eql(data);
  });
  it('handles FETCH_ARTICLES_FAILURE', () => {
    const prevState = getArticlesReducer(undefined, fetchArticlesRequest());
    const error = 'Something went wrong';
    const action = fetchArticlesFailure(error);
    const newState = getArticlesReducer(prevState, action);
    expect(newState.loading).to.be.false;
    expect(newState.error).to.eql(error);
    expect(newState.data).to.eql([]);
  });
});
