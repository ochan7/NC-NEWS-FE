import React from 'react';
import PT from 'prop-types';
import {Link} from 'react-router-dom';
import timeSince from '../utils/index';
import {CardContent} from 'material-ui/Card';
import Typography from 'material-ui/Typography';
const CommentUI = ({comment}) => (
  <CardContent align = 'left'>
    <Link to = {`/user/${comment.created_by}`}>{comment.created_by}</Link>
    <Typography type = 'caption'>{timeSince(comment.created_at)}</Typography> 
    <p>{comment.body}</p>
  </CardContent>
);

CommentUI.propTypes = {
  comment: PT.object.isRequired
};
export default CommentUI;