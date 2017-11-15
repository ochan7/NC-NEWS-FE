import React, {Component} from 'react';
import ArticleUI from '../../components/ArticleUI';
import PT from 'prop-types';
import {connect} from 'react-redux';
import getArticle from '../../actions/getArticle';
import Votes from '../Votes/index';
import Loading from '../../components/Loading';
import putArticle from '../../actions/putArticle';
class Article extends Component {
  constructor (props) {
    super(props);
  }
  componentWillMount(){
    const {article_id} = this.props;
    this.props.getArticle(article_id);
  }
  render () {
    const {article, loading, voteError, voteLoading, putArticle, votes} = this.props;
    return (

      <div>
        {loading ? 
          <Loading/> :
          <div>
            <ArticleUI article = {article}/>
            <Votes 
              votes = {
                votes === undefined ? article.votes : votes
              }
              id = {article._id}
              putData={putArticle}
              loading = {voteLoading}
              error = {voteError}
            />
          </div>
        }
      </div>
    );
  }
}
Article.propTypes = {
  article_id: PT.string.isRequired,
  article: PT.object.isRequired,
  loading: PT.bool.isRequired,
  error: PT.any.isRequired,
  getArticle: PT.func.isRequired,
  putArticle: PT.func.isRequired,
  votes:PT.number.isRequired,
  voteLoading: PT.bool.isRequired,
  voteError: PT.any.isRequired
};
const mapStateToProps = state => ({
  article: state.getArticle.data,
  loading: state.getArticle.loading,
  error: state.getArticle.error,
  votes: state.putArticle.data.votes,
  voteLoading: state.putArticle.loading,
  voteError: state.putArticle.error   
});
const mapDispatchToProps = dispatch => ({
  getArticle: (article_id) => {
    dispatch(getArticle(article_id));
  },
  putArticle: (id, vote) => {
    dispatch(putArticle(id, vote));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Article);

