import React from 'react';
import PT from 'prop-types';
import {Link} from 'react-router-dom';
const CommentUI = ({comment}) => (
  <div>
    <p>{comment.body}</p>
    <Link to = {`/user/${comment.created_by}`}>{comment.created_by}</Link>  
  </div>
);

CommentUI.propTypes = {
  comment: PT.object.isRequired
};
export default CommentUI;