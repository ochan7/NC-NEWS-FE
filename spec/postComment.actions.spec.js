import {expect} from 'chai';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import postComment, {
  postCommentFailure, postCommentRequest, postCommentSuccess
} from '../src/actions/postComment';

import {API_URL} from '../config';

const mockStore = configureMockStore([thunk]);

describe.only('postComment', () => {
  const article_id = '5a033990e03644b9fab5289c';
  it('dispatched POST_COMMENT_SUCCESS when posting comment and responds with 200 and data', () => {
    const comment = 'this is my comment';
    nock(API_URL)
      .post(`/articles/${article_id}/comments`, {comment})
      .reply(201, {comment: {
        body: comment,
        created_by: 'northcoder'
      }});

    const expectedActions = [
      postCommentRequest(article_id, comment),
      postCommentSuccess({body: comment, created_by: 'northcoder'})
    ];

    const store = mockStore();
    
    return store.dispatch(postComment(article_id, comment))
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions);
      });
  });
});