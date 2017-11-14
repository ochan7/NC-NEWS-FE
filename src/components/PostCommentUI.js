import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import React from 'react';
import PT from 'prop-types';
const PostCommentUI = ({handleChange, handleSubmit, value}) => (
  <div>
    <TextField
      hintText='POST A COMMENT'
      onChange={handleChange}
      value = {value}
    />
    <FlatButton
      label='SUBMIT'
      onClick={handleSubmit}
    />
  </div>
);
PostCommentUI.propTypes = {
  handleChange: PT.func.isRequired,
  handleSubmit: PT.func.isRequired,
  value: PT.string.isRequired
};
export default PostCommentUI;