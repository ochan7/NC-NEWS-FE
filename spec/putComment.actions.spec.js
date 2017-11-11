import {expect} from 'chai';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {API_URL} from '../config';
const mockStore = configureMockStore([thunk]);

import putComment, {
  putCommentFailure, putCommentRequest, putCommentSuccess
} from '../src/actions/putComment';

describe('putComment', () => {
  afterEach(() => {
    nock.cleanAll();
  });
  const comment_id = '5a033992e03644b9fab528c0';
  it('dispatched PUT_COMMENT_SUCCESS  when updating a comment votes up and responds with 200 and data', () => {
    const vote = 'up';
    const comment = {
      _id: comment_id,
      body: 'this is a comment',
      votes: 1
    };
    nock(API_URL)
      .put(`/comments/${comment_id}?vote=${vote}`)
      .reply(200, {comment});

    const expectedActions = [
      putCommentRequest(comment_id, vote),
      putCommentSuccess(comment)
    ];
        
    const store = mockStore();

    return store.dispatch(putComment(comment_id, vote))
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions);
      });
  });
  it('dispatched PUT_COMMENT_SUCCESS  when updating a comment votes down and responds with 200 and data', () => {
    const vote = 'down';
    const comment = {
      _id: comment_id,
      body: 'this is a comment',
      votes: 0
    };
    nock(API_URL)
      .put(`/comments/${comment_id}?vote=${vote}`)
      .reply(200, {comment});

    const expectedActions = [
      putCommentRequest(comment_id, vote),
      putCommentSuccess(comment)
    ];
        
    const store = mockStore();

    return store.dispatch(putComment(comment_id, vote))
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions);
      });
  });
  it('dispatched PUT_COMMENT_FAILURE when updating a comment and responds with an error', () => {
    const error = 'COMMENT_ID NOT FOUND';
    const wrong_id = 'adasdf';
    const vote = 'down';
    nock(API_URL)
      .put(`/comments/${wrong_id}?vote=${vote}`)
      .replyWithError({'message': error});
    
    const expectedActions = [
      putCommentRequest(wrong_id, vote),
      putCommentFailure(error)
    ];

    const store = mockStore();

    return store.dispatch(putComment(wrong_id, vote))
      .then(() => {
        expect(store.getActions()).to.eql(expectedActions);
      });
  });
});