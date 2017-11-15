import React from 'react';
import PT from 'prop-types';

const CommentUI = ({comment}) => (
  <div>
    <p>{comment.body}</p>
    <h4>{comment.created_by}</h4>
  </div>
);

CommentUI.propTypes = {
  comment: PT.object.isRequired
};
export default CommentUI;