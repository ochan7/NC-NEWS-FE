import React, {Component} from 'react';
import PT from 'prop-types';
import {connect} from 'react-redux';
import getComments from '../../actions/getComments';
import Comment from '../Comment/index';
import Loading from '../../components/Loading';
import {Redirect} from 'react-router-dom';
import Article from '../Article/index';
import PostComment from '../PostComment/index';
import deleteComment from '../../actions/deleteComment';
import Grid from 'material-ui/Grid';
class Comments extends Component {
  constructor (props) {
    super(props);
    this.state = {
      comments: []
    };
    this.handleDelete = this.handleDelete.bind(this);
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
  handleDelete(comment_id){
    const {deleteComment} = this.props;
    return () => {
      deleteComment(comment_id);
    };
  }
  render () {
    const {comments, loading, error, loadingNewPost} = this.props;
    const {state: article} = this.props.location;
    return (
      <Grid>
        <Article 
          article_id ={article._id}
        />
        <PostComment 
          article ={article}
        />
        <h3>Comments</h3>
        {
          error && <Redirect to = '/404'/>
        }
        {
          loading ? <Loading/> :

            <Grid container direction='column' align= 'left'>
              {loadingNewPost && <Loading/>}
              {
                [...this.state.comments,...comments].map((comment, index) =>(
                  <div key = {index}>
                    <Comment  
                      key = {index} 
                      comment = {comment}
                      isDeleteAble = {comment.created_by === 'northcoder'}
                      handleDelete = {this.handleDelete(comment._id)}
                    />
                  </div>
                ))
              }
         
            </Grid>
        }
      </Grid>
    );
  }
}
Comments.propTypes = {
  location: PT.object.isRequired,
  comments: PT.array.isRequired,
  loading: PT.bool.isRequired,
  error: PT.any.isRequired,
  getComments: PT.func.isRequired,
  newPost: PT.array.isRequired,
  loadingNewPost: PT.bool.isRequired,
  newPostError: PT.any.isRequired,
  deleteComment: PT.func.isRequired
};

const mapStateToProps = state => {
  const {data, loading, error} = state.getComments;
  const {data: newPost, loading: loadingNewPost, error: newPostError} = state.postComment;
  const {data:deleteData} = state.deleteComment;
  return {
    comments: data,
    loading,
    error,
    newPost,
    loadingNewPost,
    newPostError,
    deleteData
  };
};
const mapDispatchToProps = dispatch => ({
  getComments: (article_id) => {
    dispatch(getComments(article_id));
  },
  deleteComment: (comment_id) => {
    dispatch(deleteComment(comment_id));
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(Comments);