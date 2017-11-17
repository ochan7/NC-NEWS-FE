import React from 'react';
import PT from 'prop-types';
import {Link} from 'react-router-dom';
const ArticleUI = ({article}) => (
  <div>
    <h2>{article.title}</h2>
    <Link to = {`/user/${article.created_by}`}>Author {article.created_by}</Link>
    <p>{article.body}</p>
  </div>
);

ArticleUI.propTypes = {
  article: PT.object.isRequired
};

export default ArticleUI;
