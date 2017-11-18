import React from 'react';
import PT from 'prop-types';
import {Link} from 'react-router-dom';
import Card, {CardContent} from 'material-ui/Card';
import Typography from 'material-ui/Typography';
const ArticleUI = ({article}) => (
  <Card>
    <CardContent>
      <Typography type='title'>{article.title}</Typography>
      <Link to = {`/user/${article.created_by}`}>Author {article.created_by}</Link>
      <p>{article.body}</p>
    </CardContent>
  </Card>
);

ArticleUI.propTypes = {
  article: PT.object.isRequired
};

export default ArticleUI;
