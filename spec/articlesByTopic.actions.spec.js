import {expect} from 'chai';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import fetchArticlesByTopic, {
  fetchArticlesByTopicFailure, fetchArticlesByTopicRequest, fetchArticlesByTopicSuccess
} from '../src/actions/articlesByTopic';

import {API_URL} from '../config';

const mockStore = configureMockStore([thunk]);

describe.only('async action creators', () => {
  afterEach(() => {
    nock.cleanAll();
  });
  describe('fetchArticlesByTopic', () => {
    it('dispatches FETCH_ALL_SUCCESS when fetching articles by topic responds with 200 and data', () => {
      const topic = 'football';
      nock(API_URL)
        .get(`/topics/${topic}/articles`)
        .reply(200, {articles: [1, 2, 3]});

      const expectedActions = [
        fetchArticlesByTopicRequest(topic),
        fetchArticlesByTopicSuccess([1, 2, 3])
      ];

      const store = mockStore();

      return store.dispatch(fetchArticlesByTopic(topic))
        .then(() => {
          expect(store.getActions()).to.eql(expectedActions);
        });
    });
    it('dispatched FETCH_ARTICLES_BY_TOPIC_FAILURE when fetching articles by topic responds with an error', () => {
      const topic = 'asdfad';
      const error = 'TOPIC DOES NOT EXIST';
      nock(API_URL)
        .get(`/topics/${topic}/articles`)
        .replyWithError({'message': error});

      const expectedActions = [
        fetchArticlesByTopicRequest(topic),
        fetchArticlesByTopicFailure(error)
      ];

      const store = mockStore();

      return store.dispatch(fetchArticlesByTopic(topic))
        .then(() => {
          expect(store.getActions()).to.eql(expectedActions);
        });
    });
  });
});