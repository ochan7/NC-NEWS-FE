import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import React from 'react';
import PT from 'prop-types';
const PostCommentUI = ({handleChange, handleSubmit, value}) => (
  <div>
    <TextField
      hintText='POST A COMMENT'
      onChange={handleChange}
      value = {value}
    />
    <Button
      onClick={handleSubmit}
    >
    SUBMIT
    </Button>
  </div>
);
PostCommentUI.propTypes = {
  handleChange: PT.func.isRequired,
  handleSubmit: PT.func.isRequired,
  value: PT.string.isRequired
};
export default PostCommentUI;