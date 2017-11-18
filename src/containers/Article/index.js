import React, {Component} from 'react';
import ArticleUI from '../../components/ArticleUI';
import PT from 'prop-types';
import {connect} from 'react-redux';
import getArticle from '../../actions/getArticle';
import Votes from '../Votes/index';
import Loading from '../../components/Loading';
import Grid from 'material-ui/Grid';
import Card from 'material-ui/Card';
class Article extends Component {
  constructor (props) {
    super(props);
  }
  componentWillMount(){
    const {article_id} = this.props;
    this.props.getArticle(article_id);
  }
  render () {
    const {article, loading} = this.props;
    return (

      <Grid container spacing = {16} direction="column" align="center">
        {loading ? 
          <Loading/> :
          <Grid item  = {11} >
            <Card>

              <ArticleUI article = {article}/>
              <Votes
                article ={article}
              />
            </Card>
          </Grid>
        }
      </Grid>
    );
  }
}
Article.propTypes = {
  article_id: PT.string.isRequired,
  article: PT.object.isRequired,
  loading: PT.bool.isRequired,
  error: PT.any.isRequired,
  getArticle: PT.func.isRequired,

};
const mapStateToProps = state => ({
  article: state.getArticle.data,
  loading: state.getArticle.loading,
  error: state.getArticle.error,

});
const mapDispatchToProps = dispatch => ({
  getArticle: (article_id) => {
    dispatch(getArticle(article_id));
  },

});

export default connect(mapStateToProps, mapDispatchToProps)(Article);

