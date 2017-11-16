import {expect} from 'chai';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';import thunk from 'redux-thunk';

import deleteComment, {
  deleteCommentRequest, deleteCommentSuccess, deleteCommentFailure
} from '../src/actions/deleteComment';

import {API_URL} from '../config';

const mockStore = configureMockStore([thunk]);

describe('async action creators', () => {
  afterEach(() => {
    nock.cleanAll();
  });
  describe('deleteComment', () => {
    it('dispatches DELETE_COMMENT_SUCCESS when deleting comment by comment_id, responds with 204 and data', () => {
      const comment_id = '5a0dccebe81251000438fdb3';
      nock(API_URL)
        .delete(`/comments/${comment_id}`) 
        .reply(204, {});

      const expectedActions = [
        deleteCommentRequest(comment_id),
        deleteCommentSuccess({})
      ];

      const store = mockStore();

      return store.dispatch(deleteComment(comment_id))
        .then(() => {
          expect(store.getActions()).to.eql(expectedActions);
        });
    });
    it*('dispatches DELETE_COMMENT_FAILURE when deleting a comment with an invalid comment_id', () => {
      const wrong_id = 'adfasfadfasd';
      const error = 'COMMENT_ID NOT FOUND';
      nock(API_URL)
        .delete(`/comments/${wrong_id}`)
        .replyWithError({message: error});
      const expectedActions = [
        deleteCommentRequest(wrong_id),
        deleteCommentFailure(error)
      ];
      const store = mockStore();
      return store.dispatch(deleteComment(wrong_id))
        .then(() => {
          expect(store.getActions()).to.eql(expectedActions);
        });
    });
  });
});