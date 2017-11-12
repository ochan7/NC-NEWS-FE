import React from 'react';
import PT from 'prop-types';
import {Link} from 'react-router-dom';
const HomePageUI = ({articles}) => (
  <div>
    {articles.map(article => (
      <div key={article._id}>
        <h3>{article.title}</h3>
        <p>{article.body.slice(0, 100)} ...</p>
        <p>Popularity {article.votes}</p>
        <Link 
          to={{
            pathname: `/articles/${article._id}/comments`,
            state: article
          }}>
      Show More
        </Link>
      </div>
    ))}
  </div>
);

HomePageUI.propTypes = {
  articles: PT.array.isRequired
};
export default HomePageUI;