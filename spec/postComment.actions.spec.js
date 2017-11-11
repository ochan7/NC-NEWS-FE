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

  afterEach(() => {
    nock.cleanAll();
  });

  const article_id = '5a033990e03644b9fab5289c';
  const comment = 'this is my comment';

  it('dispatched POST_COMMENT_SUCCESS when posting comment and responds with 200 and data', () => {
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
  it('dispatched POST_COMMENT_FAILURE when posting comment and responds with an error', () => {
    const error = 'INVALID_INPUT';
    const wrong_id = 'asdasdf';
    nock(API_URL)
      .post(`/articles/${wrong_id}/comments`, {comment})
      .replyWithError({'message': error});
    
    const expectedActions = [
      postCommentRequest(wrong_id, comment),
      postCommentFailure(error) 
    ];
    
    const store = mockStore();

    return store.dispatch(postComment(wrong_id, comment))
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions);
      });

  });
});