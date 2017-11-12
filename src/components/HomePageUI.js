import React from 'react';
import PT from 'prop-types';
const HomePageUI = ({articles}) => (
  <div>
    {articles.map(article => (
      <div key={article._id}>
        <p>{article.title}</p>
      </div>
    ))}
  </div>
);

HomePageUI.propTypes = {
  articles: PT.array.isRequired
};
export default HomePageUI;