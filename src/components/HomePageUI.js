import React from 'react';
import PT from 'prop-types';
import {Link} from 'react-router-dom';
import Grid from 'material-ui/Grid';
import Card, { CardActions, CardContent, CardHeader} from 'material-ui/Card';
import Button from 'material-ui/Button';
const HomePageUI = ({articles}) => (
  <Grid container spacing = {8}>
    {articles.map(article => (
      <Grid
        item xs ={12}
        key={article._id}
      >
        <Card>
          <CardHeader title ={article.title} dense="true"/>
          <CardContent dense = "true">
            <p>{article.body.slice(0,100)} ...</p>
            <p>Popularity {article.votes}</p>
          </CardContent>
          <CardActions dense = 'true'>
            <Link
              className='link-class'
              to={{
                pathname: `/articles/${article._id}/comments`,
                state: article
              }}>
              <Button dense color="primary">
              Show Comments
              </Button>
            </Link>
            <Link
              className='link-class'
              to={`/user/${article.created_by}`}>
              <Button dense color="primary">
                {article.created_by}
              </Button>
            </Link>

          </CardActions>
        </Card>
      </Grid>
    ))}
  </Grid>
);

HomePageUI.propTypes = {
  articles: PT.array.isRequired
};
export default HomePageUI;