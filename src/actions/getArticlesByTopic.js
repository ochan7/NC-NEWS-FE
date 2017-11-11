import axios from 'axios';
import * as types from './types';
import {API_URL} from '../../config';

export const getArticlesByTopicRequest = (topic) => ({
  type: types.GET_ARTICLES_BY_TOPIC_REQUEST,
  payload: topic
});

export const getArticlesByTopicSuccess = (data) => ({
  type: types.GET_ARTICLES_BY_TOPIC_SUCCESS,
  payload: data
});

export const getArticlesByTopicFailure = (error) => ({
  type: types.GET_ARTICLES_BY_TOPIC_FAILURE,
  payload: error
});

export default (topic) => {
  return (dispatch) => {
    dispatch(getArticlesByTopicRequest(topic));
    return axios.get(`${API_URL}/topics/${topic}/articles`)
      .then(({data}) => {
        dispatch(getArticlesByTopicSuccess(data.articles));
      })
      .catch(error => {
        dispatch(getArticlesByTopicFailure(error.message));
      });
  };
};