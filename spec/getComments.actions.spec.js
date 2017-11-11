import {expect} from 'chai';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import getComments, {
  getCommentsRequest, getCommentsSuccess
} from '../src/actions/getComments';

import {API_URL} from '../config';

const mockStore = configureMockStore([thunk]);

describe('async action creators', () => {
  afterEach(() => {
    nock.cleanAll();
  });
  describe('getComments', () => {
    it('dispatches GET_COMMENTS_SUCCESS when geting comments by article_id responds with 200 and data', () => {
      const article_id = '5a033990e03644b9fab5289c';
      nock(API_URL)
        .get(`/articles/${article_id}/comments`)
        .reply(200, {comments: [1, 2, 3]});
      
      const expectedActions = [
        getCommentsRequest(article_id),
        getCommentsSuccess([1, 2, 3])
      ];

      const store = mockStore();

      return store.dispatch(getComments(article_id))
        .then(() => {
          expect(store.getActions()).to.eql(expectedActions);
        });
    });
  });
});