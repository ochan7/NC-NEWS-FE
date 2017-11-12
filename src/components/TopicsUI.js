import React from 'react';
import PT from 'prop-types';
import {Link} from 'react-router-dom';
const TopicsUI = ({topics}) => (
  <div>
    {topics.map(topic => (
      <Link
        key={topic.slug}
        to={`/topics/${topic.slug}/articles`}
      >
        {topic.title}
      </Link>
    ))}
  </div>
);

TopicsUI.propTypes = {
  topics: PT.array.isRequired
};

export default TopicsUI;