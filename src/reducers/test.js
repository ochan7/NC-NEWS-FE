import * as types from '../actions/types';

const initialState = false;

export default (prevState = initialState, action) => {
  switch (action.type) {
  
  case types.TOGGLE_TEST:
    return !prevState;

  default:
    return prevState;
  
  }
};
