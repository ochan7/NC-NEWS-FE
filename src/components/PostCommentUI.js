import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import React from 'react';
import PT from 'prop-types';

const PostCommentUI = ({handleChange, handleSubmit, value, handleKeyPress}) => (

  <div>

    <TextField
      label="Post a comment"
      multiline
      margin="normal"
      onChange={handleChange}
      onKeyDown={handleKeyPress}
      value = {value}
    />
    <Button
      onClick={handleSubmit}
      disabled={value.length === 0}
    >
    SUBMIT
    </Button>


  </div>
);
PostCommentUI.propTypes = {
  handleChange: PT.func.isRequired,
  handleSubmit: PT.func.isRequired,
  handleKeyPress: PT.func.isRequired,
  value: PT.string.isRequired
};
export default PostCommentUI;