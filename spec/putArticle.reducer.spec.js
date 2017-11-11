import {expect} from 'chai';
import putArticleReducer, {initialState} from '../src/reducers/putArticle';
import {
  putArticleRequest,
  putArticleSuccess,
  putArticleFailure
} from '../src/actions/putArticle';

describe('putArticle reducer', () => {
  const article_id = '5a033990e03644b9fab5289c';
  describe('default behaviour', () => {
    it('returns the passed previous state if an unrecognised action is passed', () => {
      const action = {type: 'whatever'};
      const newState = putArticleReducer(initialState, action);
      expect(newState).to.equal(initialState);
    });
    it('uses the initial state if no previous state is passed', () => {
      const action = {type: 'whatever'};
      const newState = putArticleReducer(undefined, action);
      expect(newState).to.equal(initialState);
    });
  });
  it('handles the PUT_ARTICLE_REQUEST', () => {
    const vote = 'down';
    const action = putArticleRequest(article_id, vote);
    const newState = putArticleReducer(undefined, action);
    expect(newState.loading).to.be.true;
    expect(newState.error).to.be.null;
    expect(newState.data).to.eql([]);
  });
  it('handles the PUT_ARTICLE_SUCCESS', () => {
    const vote = 'down';
    const prevState = putArticleReducer(undefined, putArticleRequest(article_id, vote));
    const data = [1, 2, 3];
    const action = putArticleSuccess(data);
    const newState = putArticleReducer(prevState, action);
    expect(newState.loading).to.be.false;
    expect(newState.error).to.be.null;
    expect(newState.data).to.eql(data);
  });
  it('handles the PUT_ARTICLE_FAILURE', () => {
    const prevState = putArticleReducer(undefined, putArticleRequest());
    const error = 'Something went wrong';
    const action = putArticleFailure(error);
    const newState = putArticleReducer(prevState, action);
    expect(newState.loading).to.be.false;
    expect(newState.error).to.eql(error);
    expect(newState.data).to.eql([]);
  });
});