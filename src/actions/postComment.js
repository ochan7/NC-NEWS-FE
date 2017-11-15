import axios from 'axios';
import * as types from './types';
import {API_URL} from '../../config';

export const postCommentRequest = (article_id, comment) => ({
  type: types.POST_COMMENT_REQUEST,
  payload: {
    article_id,
    comment
  }
});

export const postCommentSuccess = (data) => ({
  type: types.POST_COMMENT_SUCCESS,
  payload: data
});

export const postCommentFailure = (error) => ({
  type: types.POST_COMMENT_FAILURE,
  payload: error
});

export default (article_id, comment) => {
  return (dispatch) => {
    dispatch(postCommentRequest(article_id, comment));
    return axios.post(`${API_URL}/articles/${article_id}/comments`,
      {
        comment: comment
      })
      .then(({data}) => {
        dispatch(postCommentSuccess([data.comment]));
      })
      .catch(error => {
        dispatch(postCommentFailure(error.message));
      });
  };
};