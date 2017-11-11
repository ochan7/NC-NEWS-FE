import axios from 'axios';
import * as types from './types';
import {API_URL} from '../../config';

export const getCommentsRequest = (article_id) => ({
  type: types.GET_COMMENTS_REQUEST,
  payload: article_id
});

export const getCommentsSuccess = (data) => ({
  type: types.GET_COMMENTS_SUCCESS,
  payload: data
});

export const getCommentsFailure = (error) => ({
  type: types.GET_COMMENTS_FAILURE,
  payload: error
});

export default (article_id) => {
  return (dispatch) => {
    dispatch(getCommentsRequest(article_id));
    return axios.get(`${API_URL}/articles/${article_id}/comments`)
      .then(({data}) => {
        dispatch(getCommentsSuccess(data.comments));
      })
      .catch(error => {
        dispatch(getCommentsFailure(error.message));
      });
  };
};