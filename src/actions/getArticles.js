import axios from 'axios';
import * as types from './types';

import {API_URL} from '../../config';

export const getArticlesRequest = () => ({
  type: types.GET_ARTICLES_REQUEST
});

export const getArticlesSuccess = (data) => ({
  type: types.GET_ARTICLES_SUCCESS,
  payload: data
});

export const getArticlesFailure = (error) => ({
  type: types.GET_ARTICLES_FAILURE,
  payload: error
});

export default () => {
  return (dispatch) => {
    dispatch(getArticlesRequest());
    return axios.get(`${API_URL}/articles`)
      .then(res => {
        dispatch(getArticlesSuccess(res.data.articles));
      })
      .catch(error => {
        dispatch(getArticlesFailure(error.message));
      });
  };
};