import {expect} from 'chai';
import getArticlesByTopicReducer, {initialState} from '../../src/reducers/getArticlesByTopic';
import {
  getArticlesByTopicFailure,
  getArticlesByTopicRequest,
  getArticlesByTopicSuccess
} from '../../src/actions/getArticlesByTopic';

describe('getArticlesByTopic reducer', () => {
  const topic = 'football';
  describe('default behaviour', () => {
    it('returns the passed previous state if an unrecognised action is passed', () => {
      const action = {type: 'whatever'};
      const newState =getArticlesByTopicReducer(initialState, action);
      expect(newState).to.equal(initialState);
    });
    it('uses the initial state if no previous state is passed', () => {
      const action = {type: 'whatever'};
      const newState =getArticlesByTopicReducer(undefined, action);
      expect(newState).to.equal(initialState);
    });
  });
  it('handles GET_ARTICLES_BY_TOPIC_REQUEST', () => {
    const action = getArticlesByTopicRequest(topic);
    const newState =getArticlesByTopicReducer(undefined, action);
    expect(newState.loading).to.be.true;
    expect(newState.error).to.be.null;
    expect(newState.data).to.eql([]);
  });
  it('handles GET_ARTICLES_BY_TOPIC_SUCCESS', () => {
    const prevState =getArticlesByTopicReducer(undefined, getArticlesByTopicRequest(topic));
    const data = [1,2,3];
    const action = getArticlesByTopicSuccess(data);
    const newState =getArticlesByTopicReducer(prevState, action);
    expect(newState.loading).to.be.false;
    expect(newState.error).to.be.null;
    expect(newState.data).to.eql(data);
  });
  it('handles GET_ARTICLES_BY_TOPIC_FAILURE', () => {
    const prevState =getArticlesByTopicReducer(undefined, getArticlesByTopicRequest());
    const error = 'Something went wrong';
    const action = getArticlesByTopicFailure(error);
    const newState =getArticlesByTopicReducer(prevState,action);
    expect(newState.loading).to.be.false;
    expect(newState.error).to.eql(error);
    expect(newState.data).to.eql([]);
  });
});