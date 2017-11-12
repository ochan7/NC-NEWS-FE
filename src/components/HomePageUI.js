import React from 'react';
import PT from 'prop-types';
const HomePageUI = ({articles}) => (
  <div>
    {articles.map(article => (
      <div key={article._id}>
        <h3>{article.title}</h3>
        <p>{article.body.slice(0, 100)} ...</p>
        <p>Popularity {article.votes}</p>
      </div>
    ))}
  </div>
);

HomePageUI.propTypes = {
  articles: PT.array.isRequired
};
export default HomePageUI;