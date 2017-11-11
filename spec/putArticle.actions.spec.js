import {expect} from 'chai';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {API_URL} from '../config';
const mockStore = configureMockStore([thunk]);

import putArticle, {
  putArticleFailure, putArticleRequest, putArticleSuccess
} from '../src/actions/putArticle';

describe('putArticle', () => {
  afterEach(() => {
    nock.cleanAll();
  });
  const article_id = '5a033990e03644b9fab5289c';
  it('dispatched PUT_ARTICLE_SUCCESS when updating an article votes up and responds with 200 and data', () => {
    const vote = 'up';
    const data = {
      _id: article_id,
      votes: 1
    };
    nock(API_URL)
      .put(`/articles/${article_id}?vote=${vote}`)
      .reply(200, data);

    const expectedActions = [
      putArticleRequest(article_id, vote),
      putArticleSuccess(data)
    ];

    const store = mockStore();

    return store.dispatch(putArticle(article_id, vote))
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions);
      });
  });
  it('dispatched PUT_ARTICLE_SUCCESS when updating an article votes down and responds with 200 and data', () => {
    const vote = 'down';
    const data = {
      _id: article_id,
      votes: 0
    };
    nock(API_URL)
      .put(`/articles/${article_id}?vote=${vote}`)
      .reply(200, data);

    const expectedActions = [
      putArticleRequest(article_id, vote),
      putArticleSuccess(data)
    ];

    const store = mockStore();

    return store.dispatch(putArticle(article_id, vote))
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions);
      });
  });
  it('dispatched PUT_ARTICLE_FAILURE when updating article and responds with an error', () => {
    const error = 'ARTICLE_ID NOT FOUND';
    const wrong_id = 'asdasdf';
    const vote = 'down';
    nock(API_URL)
      .put(`/articles/${wrong_id}?vote=${vote}`)
      .replyWithError({'message': error});
      
    const expectedActions = [
      putArticleRequest(wrong_id, vote),
      putArticleFailure(error) 
    ];
      
    const store = mockStore();
  
    return store.dispatch(putArticle(wrong_id, vote))
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions);
      });
  });
});