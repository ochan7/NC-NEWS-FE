import {expect} from 'chai';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import getArticle, {
  getArticleRequest, getArticleSuccess, getArticleFailure
} from '../src/actions/getArticle';

import {API_URL} from '../config';

const mockStore = configureMockStore([thunk]);

describe('async action creators', () => {
  afterEach(() => {
    nock.cleanAll();
  });
  describe('getArticle', () => {
    it('dispatches GET_ARTICLE_SUCCESS when geting article by article_id responds with 200 and data', () => {
      const article_id = '5a033990e03644b9fab5289c';
      const article =  {
        title: 'this is a title'
      };
      nock(API_URL)
        .get(`/articles/${article_id}`)
        .reply(200, {article});
      
      const expectedActions = [
        getArticleRequest(article_id),
        getArticleSuccess(article)
      ];

      const store = mockStore();

      return store.dispatch(getArticle(article_id))
        .then(() => {
          expect(store.getActions()).to.eql(expectedActions);
        });
    });
    it('dispatches GET_ARTICLE_FAILURE when getting article by article_id responds with error', () => {
      const wrong_id = 'asdadasdfasdf';
      const error = 'Page not found';
      nock(API_URL)
        .get(`/articles/${wrong_id}`)
        .replyWithError({message: error});
          
      const expectedActions = [
        getArticleRequest(wrong_id),
        getArticleFailure(error)
      ];
      const store = mockStore();

      return store.dispatch(getArticle(wrong_id))
        .then(() => {
          expect(store.getActions()).to.eql(expectedActions);
        });
    });
  });
});