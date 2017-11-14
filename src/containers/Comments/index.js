import React, {Component} from 'react';
import PT from 'prop-types';
import {connect} from 'react-redux';
import getComments from '../../actions/getComments';
import CommentsUI from '../../components/CommentsUI';
import Loading from '../../components/Loading';
import {Redirect} from 'react-router-dom';
import Article from '../Article/index';
import PostComment from '../PostComment/index';
class Comments extends Component {
  constructor (props) {
    super(props);
    this.state = {
      comments: []
    };
  }
  componentDidMount(){
    const article_id = this.props.location.state._id;
    this.props.getComments(article_id);
  }
  componentWillReceiveProps(nextProps){
    const {newPost} = nextProps;
    if(this.props.newPost !== newPost) {
      const prevComment = this.state.comments;
      this.setState({
        comments: [...newPost, ...prevComment]
      });
    }
  }
  render () {
    const {comments, loading, error, loadingNewPost} = this.props;
    const {state: article} = this.props.location;
    return (
      <div>
        <Article article ={article}/>
        <PostComment article ={article}/>
        <h3>Comments</h3>
        {
          error && <Redirect to = '/404'/>
        }
        {
          loading ? <Loading/> :
            <div>
              {loadingNewPost && <Loading/>}
              <CommentsUI
                article = {article}
                comments = {
                  [...this.state.comments,...comments]
                }
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
  getComments: PT.func.isRequired,
  newPost: PT.array.isRequired,
  loadingNewPost: PT.bool.isRequired,
  newPostError: PT.any.isRequired
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