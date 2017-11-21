import React, {Component} from 'react';
import PT from 'prop-types';
import {connect} from 'react-redux';
import getComments from '../../actions/getComments';
import Comment from '../Comment/index';
import Loading from '../../components/Loading';
import {Redirect} from 'react-router-dom';
import Article from '../Article/index';
import deleteComment from '../../actions/deleteComment';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
class Comments extends Component {
  constructor (props) {
    super(props);
    this.state = {
      comments: [],
      id: ''
    };
    this.handleDelete = this.handleDelete.bind(this);
  }
  componentWillMount(){
    const article_id = this.props.location.state._id;
    this.props.getComments(article_id);
  }
  
  componentWillReceiveProps(nextProps){
    const currLength = this.state.comments.length;
    const prevComments = this.state.comments;
    const {loading, deleteLoading} = this.props;
    const {newPost} = nextProps;

    if(currLength === 0 || loading && !nextProps.loading) {
      this.setState({
        comments: nextProps.comments
      });    
    }

    else if(newPost[0] !== undefined) {
      if(prevComments.findIndex(item => item._id === newPost[0]._id) < 0) {
        this.setState({
          comments: [...newPost, ...prevComments]
        });
      }
    }

    else if(deleteLoading && !nextProps.deleteLoading ){
      this.setState({
        comments: prevComments.filter(comnent => comnent._id !== this.state.id)
      });
    }
  }
  handleDelete(comment_id){
    const {deleteComment} = this.props;
    return () => {
      deleteComment(comment_id);
      this.setState({
        id: comment_id
      });
    };
  }
  render () {
    const {loading, error, loadingNewPost} = this.props;
    const {state: article} = this.props.location;
    const {comments} = this.state;
    return (
      <Grid>
        <Article 
          article_id ={article._id}
        />
        {error && <Redirect to = '/404'/>}
        {loadingNewPost && <Loading/>}
        {
          loading ? <Loading/>:
            <Grid container align= 'left'  justify = 'center'>
              <Grid item xs={11}>
                <Typography type = 'title'>Comments</Typography>
              </Grid>
              {
                [...comments]
                  .map((comment, index) =>(
                    <Comment
                      deleteLoading = {loading}
                      key = {index} 
                      comment = {comment}
                      isDeleteAble = {comment.created_by === 'northcoder'}
                      handleDelete = {this.handleDelete(comment._id)}
                    />
                  ))}
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
  deleteLoading: PT.bool.isRequired,
  deleteComment: PT.func.isRequired
};

const mapStateToProps = state => {
  const {data, loading, error} = state.getComments;
  const {data: newPost, loading: loadingNewPost, error: newPostError} = state.postComment;
  const {data:deleteData, loading: deleteLoading} = state.deleteComment;
  return {
    comments: data,
    loading,
    error,
    newPost,
    loadingNewPost,
    newPostError,
    deleteData,
    deleteLoading
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