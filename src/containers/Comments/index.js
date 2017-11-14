import React, {Component} from 'react';
import PT from 'prop-types';
import {connect} from 'react-redux';
import getComments from '../../actions/getComments';
// import postComment from '../../actions/postComment';
import CommentsUI from '../../components/CommentsUI';
import Loading from '../../components/Loading';
import {Redirect} from 'react-router-dom';
import Article from '../Article/index';
import PostComment from '../PostComment/index';
class Comments extends Component {
  componentDidMount(){
    const article_id = this.props.location.state._id;
    this.props.getComments(article_id);
  }
  render () {
    const {comments, loading, error} = this.props;
    const {state: article} = this.props.location;
    return (
      <div>
        <Article article ={article}/>
        <PostComment article ={article}/>
        {
          error && <Redirect to = '/404'/>
        }
        {
          loading ? <Loading/> :
            <div>
              <CommentsUI
                article = {article}
                comments = {comments}
              />
            </div>
        }
      </div>
    );
  }
}
Comments.propTypes = {
  location: PT.object.isRequired,
  comments: PT.array.isRequired,
  loading: PT.bool.isRequired,
  error: PT.any,
  getComments: PT.func.isRequired
};

const mapStateToProps = state => {
  const {data, loading, error} = state.getComments;
  const {data: newPost, loading: loadingNewPost, error: newPostError} = state.postComment;
  return {
    comments: data,
    loading,
    error,
    newPost,
    loadingNewPost,
    newPostError
  };
};
const mapDispatchToProps = dispatch => ({
  getComments: (article_id) => {
    dispatch(getComments(article_id));
  } 
});
export default connect(mapStateToProps, mapDispatchToProps)(Comments);