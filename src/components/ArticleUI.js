import React from 'react';
import PT from 'prop-types';
import {Link} from 'react-router-dom';
import Card, {CardContent, CardActions} from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Votes from '../containers/Votes/index';
const ArticleUI = ({article}) => (
  <Card>
    <CardContent>
      <Typography type='title'>{article.title}</Typography>
      <Typography type= 'subheading'>Created by
        <Link
          className='link-class'
          to={`/user/${article.created_by}`}>
          <Button dense color="primary">
            {article.created_by}
          </Button>
        </Link>
      </Typography>
      <p>{article.body}</p>
    </CardContent>
    <CardActions>
      <Votes article={article}/>
    </CardActions>
  </Card>
);

ArticleUI.propTypes = {
  article: PT.object.isRequired
};

export default ArticleUI;
