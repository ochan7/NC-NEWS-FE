import React from 'react';
import PT from 'prop-types';
const CommentsUI = ({comments}) => (
  <div>
    <h3>Comments</h3>
    {comments
      .sort((a,b) => b.created_at - a.created_at)
      .map(comment => (
        <div key = {comment._id}>
          <p>{comment.body}</p>
          <h4>{comment.created_by}</h4>
        </div>
      ))}
  </div>
);

CommentsUI.propTypes = {
  article: PT.object.isRequired,
  comments: PT.array.isRequired
};
export default CommentsUI;