import axios from 'axios';
import * as types from './types';
import {API_URL} from '../../config';

export const putCommentRequest = (comment_id, vote) => ({
  type: types.PUT_COMMENT_REQUEST,
  payload: {
    comment_id,
    vote
  }
});

export const putCommentSuccess = (data) => ({
  type: types.PUT_COMMENT_SUCCESS,
  payload: data
});

export const putCommentFailure = (error) => ({
  type: types.PUT_COMMENT_FAILURE,
  payload: error
});