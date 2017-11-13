import React, {Component} from 'react';
import ArticleUI from '../../components/ArticleUI';
import PT from 'prop-types';
class Article extends Component {
  constructor (props) {
    super(props);
  }
  render () {
    return (
      <ArticleUI article = {this.props.article}/>
    );
  }
}
Article.propTypes = {
  article: PT.object.isRequired
};
export default Article;