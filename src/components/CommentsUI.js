import React from 'react';
import PT from 'prop-types';
const CommentsUI = ({comments}) => (
  <div>
    {comments
      .map((comment, index) => (
        <div key = {index}>
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