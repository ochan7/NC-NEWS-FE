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
    };
    this.handleDelete = this.handleDelete.bind(this);
  }
  componentDidMount(){
    const article_id = this.props.location.state._id;
    this.props.getComments(article_id);
  }
  
  componentWillReceiveProps(nextProps){
    const currLength = this.state.comments.length;
    if(currLength === 0) {
      this.setState({
        comments: nextProps.comments
      });    
    }
    const {newPost} = nextProps;
    if(newPost[0] !== undefined) {

      if(this.state.comments.findIndex(item => item._id === newPost[0]._id) < 0) {
        const prevComment = this.state.comments;
        this.setState({
          comments: [...newPost, ...prevComment]
        });
      }
    }
  }
  handleDelete(comment_id, index){
    const {deleteComment} = this.props;
    const oldComments = this.state.comments;
    const newComments = [...oldComments.slice(0, +index), ...oldComments.slice(+index)];
    return () => {
      deleteComment(comment_id);
      this.setState({
        comments: newComments
      });
    };
  }
  render () {
    const {loading, error, loadingNewPost} = this.props;
    const {state: article} = this.props.location;
    return (
      <Grid>
        <Article 
          article_id ={article._id}
        />
        {error && <Redirect to = '/404'/>}
        {loadingNewPost && <Loading/>}
        {
          loading ? <Loading/>:
            <Grid container align= 'left' spacing={16} justify = 'center'>
              <Grid item xs={11}>
                <Typography type = 'title'>Comments</Typography>
              </Grid>
              {[...this.state.comments].map((comment, index) =>(
                <Comment
                  deleteLoading = {loading}
                  key = {index} 
                  comment = {comment}
                  isDeleteAble = {comment.created_by === 'northcoder'}
                  handleDelete = {this.handleDelete(comment._id, index)}
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