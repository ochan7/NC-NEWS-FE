import axios from 'axios';
import * as types from './types';
import {API_URL} from '../../config';

export const getTopicsRequest = () => ({
  type: types.GET_TOPICS_REQUEST
});

export const getTopicsSuccess = (data) => ({
  type: types.GET_TOPICS_SUCCESS,
  payload: data
});

export const getTopicsFailure = (error) => ({
  type: types.GET_TOPICS_FAILURE,
  payload: error
});

export default () => {
  return (dispatch) => {
    dispatch(getTopicsRequest());
    return axios.get(`${API_URL}/topics`)
      .tben(({data}) => {
        dispatch(getTopicsSuccess(data.topics));
      })
      .catch(({message}) => {
        dispatch(getTopicsFailure(message));
      });
  };
};