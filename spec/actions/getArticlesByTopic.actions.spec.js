import {expect} from 'chai';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import getArticlesByTopic, {
  getArticlesByTopicFailure, getArticlesByTopicRequest, getArticlesByTopicSuccess
} from '../../src/actions/getArticlesByTopic';

import {API_URL} from '../../config';

const mockStore = configureMockStore([thunk]);

describe('async action creators', () => {
  afterEach(() => {
    nock.cleanAll();
  });
  describe('getArticlesByTopic', () => {
    it('dispatches GET_ALL_SUCCESS when geting articles by topic responds with 200 and data', () => {
      const topic = 'football';
      nock(API_URL)
        .get(`/topics/${topic}/articles`)
        .reply(200, {articles: [1, 2, 3]});

      const expectedActions = [
        getArticlesByTopicRequest(topic),
        getArticlesByTopicSuccess([1, 2, 3])
      ];

      const store = mockStore();

      return store.dispatch(getArticlesByTopic(topic))
        .then(() => {
          expect(store.getActions()).to.eql(expectedActions);
        });
    });
    it('dispatched GET_ARTICLES_BY_TOPIC_FAILURE when geting articles by topic responds with an error', () => {
      const topic = 'asdfad';
      const error = 'TOPIC DOES NOT EXIST';
      nock(API_URL)
        .get(`/topics/${topic}/articles`)
        .replyWithError({'message': error});

      const expectedActions = [
        getArticlesByTopicRequest(topic),
        getArticlesByTopicFailure(error)
      ];

      const store = mockStore();

      return store.dispatch(getArticlesByTopic(topic))
        .then(() => {
          expect(store.getActions()).to.eql(expectedActions);
        });
    });
  });
});