import {expect} from 'chai';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import getArticles, {
  getArticlesRequest, getArticlesSuccess, getArticlesFailure
} from '../../src/actions/getArticles';

import  {API_URL} from '../../config';

const mockStore = configureMockStore([thunk]);

describe('async action creators', () => {
  afterEach(() => {
    nock.cleanAll();
  });
  describe('getAllArticles', () => {
    it('dispatches GET_ALL_ARTICLES_SUCCESS when geting articles reponds with 200 and data', () => {
      nock(API_URL)
        .get('/articles')
        .reply(200, { articles: [1, 2, 3] });
      
      const expectedActions = [
        getArticlesRequest(),
        getArticlesSuccess([1, 2, 3])
      ];

      const store = mockStore();

      return store.dispatch(getArticles())
        .then(() => {
          expect(store.getActions()).to.eql(expectedActions);
        });
    });
    it('dispatches GET_ALL_ARTICLES_FAILURE when geting articles reponds with an error', () => {
      nock(API_URL)
        .get('/articles')
        .replyWithError({'message': 'error'});
      
      const expectedActions = [
        getArticlesRequest(),
        getArticlesFailure('error')
      ];

      const store = mockStore();

      return store.dispatch(getArticles())
        .then(() => {
          expect(store.getActions()).to.eql(expectedActions);
        });
    });
  });
});
