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
});