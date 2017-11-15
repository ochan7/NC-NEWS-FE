import axios from 'axios';
import * as types from './types';
import {API_URL} from '../../config';

export const getArticleRequest = (article_id) => ({
  type: types.GET_ARTICLE_REQUEST,
  payload: article_id
});

export const getArticleSuccess = (data) => ({
  type: types.GET_ARTICLE_SUCCESS,
  payload: data
});

export const getArticleFailure = (error) => ({
  type: types.GET_ARTICLE_FAILURE,
  payload: error
});

export default (article_id) => {
  return (dispatch) => {
    dispatch(getArticleRequest(article_id));
    return axios.get(`${API_URL}/articles/${article_id}`)
      .then(({data: {article}}) => {
        dispatch(getArticleSuccess(article));
      })
      .catch(error => {
        dispatch(getArticleFailure(error.message));
      });
  };
};