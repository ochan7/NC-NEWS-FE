import React from 'react';

const CommentsUI = ({article, comments}) => (
  <div>
    <div>
      <h2>{article.title}</h2>
      <h5>Author {article.created_by}</h5>
      <p>{article.body}</p>
      <h5>Popularity {article.votes}</h5>
    </div>
    <h3>Comments</h3>
    {comments.map(comment => (
      <div key = {comment._id}>
        <p>{comment.body}</p>
        <h4>{comment.created_by}</h4>
      </div>
    ))}
  </div>
);

export default CommentsUI;