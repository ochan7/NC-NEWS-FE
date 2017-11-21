import React from 'react';
import PT from 'prop-types';
import {Link} from 'react-router-dom';
import Grid from 'material-ui/Grid';
import Card, { CardActions, CardContent} from 'material-ui/Card';
import Button from 'material-ui/Button';
import Loading from '../components/Loading';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';

const styles = {
  card: {
    maxWidth: 800,
  }
};
const HomePageUI = ({articles, loading, classes}) => (
  <Grid container spacing = {16} direction="column" align="center">
    {loading && <Loading/>}
    {articles.map(article => (
      <Grid
        item sm ={11}
        key={article._id}
      >
        <Card className={classes.card}>
          <CardContent dense = "false">
            <Link
              className='link-class'
              to={{
                pathname: `/articles/${article._id}/comments`,
                state: article
              }}>
              <Typography type= 'headline'>{article.title}</Typography>
            </Link>
            <Typography type= 'subheading'>Created by
              <Link
                className='link-class'
                to={`/user/${article.created_by}`}>
                <Button dense color="primary">
                  {article.created_by}
                </Button>
              </Link>
            </Typography>
            <Link
              className='link-class'
              to={{
                pathname: `/articles/${article._id}/comments`,
                state: article
              }}>
              <Typography type= 'body' noWrap='true' className='article-snippet'>{article.body}</Typography>
            </Link>
          </CardContent>
          <CardActions dense = 'true' align='center'>
            <Button disabled = 'true'>
              <Typography className = 'article-snippet'>
                {article.votes} LIKES
              </Typography>
            </Button>
          </CardActions>
        </Card>
      </Grid>
    ))}
  </Grid>
);

HomePageUI.propTypes = {
  classes: PT.object.isRequired,
  articles: PT.array.isRequired,
  loading: PT.bool.isRequired
};
export default withStyles(styles)(HomePageUI);