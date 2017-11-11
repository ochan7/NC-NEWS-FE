import axios from 'axios';
import * as types from './types';
import {API_URL} from '../../config';

export const getUserRequest = (username) => ({
  type: types.GET_USER_REQUEST,
  payload: username
});

export const getUserSuccess = (data) => ({
  type: types.GET_USER_SUCCESS,
  payload: data
});

export const getUserFailure = (error) => ({
  type: types.GET_USER_FAILURE,
  payload: error
});

export default (username) => {
  return (dispatch) => {
    dispatch(getUserRequest(username));
    return axios.get(`${API_URL}/users/${username}`)
      .then(({data}) => {
        dispatch(getUserSuccess(data.users));
      })
      .catch(error => {
        dispatch(getUserFailure(error.message));
      });
  };
};