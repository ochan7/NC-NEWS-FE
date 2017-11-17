import axios from 'axios';
import * as types from './types';
import {API_URL} from '../../config';

export const getUserDataRequest = (username) => ({
  type: types.GET_USER_DATA_REQUEST,
  payload: username
});

export const getUserDataSuccess = (data) => ({
  type: types.GET_USER_DATA_SUCCESS,
  payload: data
});

export const getUserDataFailure = (error) => ({
  type: types.GET_USER_DATA_FAILURE,
  payload: error
});

export default (username) => {
  return (dispatch) => {
    dispatch(getUserDataRequest(username));
    return axios.get(`${API_URL}/users/${username}/repos`)
      .then(({data}) => {
        dispatch(getUserDataSuccess(data));
      })
      .catch(error => {
        dispatch(getUserDataFailure(error.message));
      });
  };
};