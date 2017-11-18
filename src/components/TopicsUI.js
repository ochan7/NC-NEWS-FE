import React from 'react';
import PT from 'prop-types';
import {Link} from 'react-router-dom';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
const TopicsUI = ({topics}) => (
  <Grid>
    {topics.map(topic => (
      <Link
        className='link-class'
        key={topic.slug}
        to={`/topics/${topic.slug}/articles/1`}
      >
        <Button >
          {topic.title}
        </Button>
      </Link>
    ))}
  </Grid>
);

TopicsUI.propTypes = {
  topics: PT.array.isRequired
};

export default TopicsUI;