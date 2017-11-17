import React from 'react';
import PT from 'prop-types';
import {Link} from 'react-router-dom';
import Button from 'material-ui/Button';
const TopicsUI = ({topics}) => (
  <div>
    {topics.map(topic => (
      <Link
        className='link-class'
        key={topic.slug}
        to={`/topics/${topic.slug}/articles`}
      >
        <Button>
          {topic.title}
        </Button>
      </Link>
    ))}
  </div>
);

TopicsUI.propTypes = {
  topics: PT.array.isRequired
};

export default TopicsUI;