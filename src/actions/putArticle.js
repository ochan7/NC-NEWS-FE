import axios from 'axios';
import * as types from './types';
import {API_URL} from '../../config';

export const putArticleRequest = (article_id, vote) => ({
  type: types.PUT_ARTICLE_REQUEST,
  payload: {
    article_id,
    vote
  }
});

export const putArticleSuccess = (data) => ({
  type: types.PUT_ARTICLE_SUCCESS,
  payload: data
});

export const putArticleFailure = (error) => ({
  type: types.PUT_ARTICLE_FAILURE,
  payload: error
});

export default (article_id, vote) => {
  return (dispatch) => {
    dispatch(putArticleRequest(article_id, vote));
    return axios.put(`${API_URL}/articles/${article_id}?vote=${vote}`)
      .then(({data}) => {
        dispatch(putArticleSuccess(data.article));
      })
      .catch(error => {
        dispatch(putArticleFailure(error.message));
      });
  };
};