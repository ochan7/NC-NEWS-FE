import {expect} from 'chai';
import articlesByTopicReducer, {initialState} from '../src/reducers/articlesByTopic';
import {
  fetchArticlesByTopicFailure,
  fetchArticlesByTopicRequest,
  fetchArticlesByTopicSuccess
} from '../src/actions/articlesByTopic';

describe('articlesByTopic reducer', () => {
  describe('default behaviour', () => {
    it('returns the passed previous state if an unrecognised action is passed', () => {
      const action = {type: 'whatever'};
      const newState = articlesByTopicReducer(initialState, action);
      expect(newState).to.equal(initialState);
    });
    it('uses the initial state if no previous state is passed', () => {
      const action = {type: 'whatever'};
      const newState = articlesByTopicReducer(undefined, action);
      expect(newState).to.equal(initialState);
    });
  });
  it('handles FETCH_ARTICLES_BY_TOPIC_REQUEST', () => {
    const topic = 'football';
    const action = fetchArticlesByTopicRequest(topic);
    const newState = articlesByTopicReducer(undefined, action);
    expect(newState.loading).to.be.true;
    expect(newState.error).to.be.null;
    expect(newState.data).to.eql([]);
  });
  it('handles FETCH_ARTICLES_BY_TOPIC_SUCCESS', () => {
    const topic = 'football';
    const prevState = articlesByTopicReducer(undefined, fetchArticlesByTopicRequest(topic));
    const data = [1,2,3];
    const action = fetchArticlesByTopicSuccess(data);
    const newState = articlesByTopicReducer(prevState, action);
    expect(newState.loading).to.be.false;
    expect(newState.error).to.be.null;
    expect(newState.data).to.eql(data);
  });
  it('handles FETCH_ARTICLES_BY_TOPIC_FAILURE', () => {
    const prevState = articlesByTopicReducer(undefined, fetchArticlesByTopicRequest());
    const error = 'Something went wrong';
    const action = fetchArticlesByTopicFailure(error);
    const newState = articlesByTopicReducer(prevState,action);
    expect(newState.loading).to.be.false;
    expect(newState.error).to.eql(error);
    expect(newState.data).to.eql([]);
  });
});