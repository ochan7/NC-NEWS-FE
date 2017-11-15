import React from 'react';
import PT from 'prop-types';
const ArticleUI = ({article}) => (
  <div>
    <h2>{article.title}</h2>
    <h5>Author {article.created_by}</h5>
    <p>{article.body}</p>
  </div>
);

ArticleUI.propTypes = {
  article: PT.object.isRequired
};

export default ArticleUI;
