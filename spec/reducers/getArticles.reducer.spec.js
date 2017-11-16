import {expect} from 'chai';
import getArticlesReducer, {initialState} from '../../src/reducers/getArticles';
import {
  getArticlesRequest,
  getArticlesSuccess,
  getArticlesFailure
} from '../../src/actions/getArticles';

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
  it('handles GET_ARTICLES_REQUEST', () => {
    const action = getArticlesRequest();
    const newState = getArticlesReducer(undefined, action);
    expect(newState.loading).to.be.true;
    expect(newState.error).to.be.null;
    expect(newState.data).to.eql([]);
  });
  it('handles GET_ARTICLES_SUCCESS', () => {
    const prevState = getArticlesReducer(undefined, getArticlesRequest());
    const data = [1, 2, 3];
    const action = getArticlesSuccess(data);
    const newState = getArticlesReducer(prevState, action);
    expect(newState.loading).to.be.false;
    expect(newState.error).to.be.null;
    expect(newState.data).to.eql(data);
  });
  it('handles GET_ARTICLES_FAILURE', () => {
    const prevState = getArticlesReducer(undefined, getArticlesRequest());
    const error = 'Something went wrong';
    const action = getArticlesFailure(error);
    const newState = getArticlesReducer(prevState, action);
    expect(newState.loading).to.be.false;
    expect(newState.error).to.eql(error);
    expect(newState.data).to.eql([]);
  });
});
