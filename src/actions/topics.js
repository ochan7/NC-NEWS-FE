import axios from 'axios';
import * as types from './types';
import {API_URL} from '../../config';

export const fetchTopicsRequest = () => ({
  type: types.FETCH_TOPICS_REQUEST
});

export const fetchTopicsSuccess = (data) => ({
  type: types.FETCH_TOPICS_SUCCESS,
  payload: data
});

export const fetchTopicsFailure = (error) => ({
  type: types.FETCH_TOPICS_FAILURE,
  payload: error
});

export default () => {
  return (dispatch) => {
    dispatch(fetchTopicsRequest());
    return axios.get(`${API_URL}/topics`)
      .tben(({data}) => {
        dispatch(fetchTopicsSuccess(data.topics));
      })
      .catch(({message}) => {
        dispatch(fetchTopicsFailure(message));
      });
  };
};