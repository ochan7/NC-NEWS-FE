import React from 'react';
import PT from 'prop-types';
import {Link} from 'react-router-dom';
import Grid from 'material-ui/Grid';
import Card, { CardActions, CardContent} from 'material-ui/Card';
import Button from 'material-ui/Button';
import Loading from '../components/Loading';
import Typography from 'material-ui/Typography';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
const HomePageUI = ({articles, loading}) => (
  <Grid container spacing = {8}>
    {loading && <Loading/>}
    {articles.map(article => (
      <Grid
        item xs ={12}
        key={article._id}
      >
        <Card>
          <CardContent dense = "false">
            <Typography type= 'title'>{article.title}</Typography>
            <Typography type= 'subheading'>Created by
              <Link
                className='link-class'
                to={`/user/${article.created_by}`}>
                <Button dense color="primary">
                  {article.created_by}
                </Button>
              </Link>
            </Typography>
            <p>{article.body.slice(0,100)} ...</p>

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
            <Chip
              avatar={<Avatar>{article.votes}</Avatar>}
              label = 'Votes'
            />
          </CardActions>
        </Card>
      </Grid>
    ))}
  </Grid>
);

HomePageUI.propTypes = {
  articles: PT.array.isRequired,
  loading: PT.bool.isRequired
};
export default HomePageUI;