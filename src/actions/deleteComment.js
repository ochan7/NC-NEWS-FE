import axios from 'axios';
import * as types from './types';
import {API_URL} from '../../config';

export const deleteCommentRequest = (comment_id) => ({
  type: types.DELETE_COMMENT_REQUEST,
  payload: comment_id
});

export const deleteCommentSuccess = (data) => ({
  type: types.DELETE_COMMENT_SUCCESS,
  payload: data
});

export const deleteCommentFailure = (error) => ({
  type: types.DELETE_COMMENT_FAILURE,
  payload: error
});

export default (comment_id) => {
  return (dispatch) => {
    dispatch(deleteCommentRequest(comment_id));
    return axios.delete(`${API_URL}/comments/${comment_id}`)
      .then((res) => {
        dispatch(deleteCommentSuccess(res.data));
      })
      .catch(error => {
        dispatch(deleteCommentFailure(error.message));
      });
  };
};