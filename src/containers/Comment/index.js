import React, {Component} from 'react';
import PT from 'prop-types';
import CommentUI from '../../components/CommentUI';
// import {connect} from 'react-redux';
// import putComment from '../../actions/putComment';
// import Votes from '../Votes/index';
class Comment extends Component {
  render() {
    const {comment} = this.props;
    // const {votes, loading, putComment, error} = this.props;
    return (
      <div>
        <CommentUI comment={comment}/>
        {/* <Votes
          votes = {
            votes === undefined ? comment.votes : votes
          }
          id = {comment._id}
          putData={putComment}
          loading = {loading}
          error = {error}
        /> */}
      </div>
    );
  }
} 
      
// const mapStateToProps = state => ({
//   votes: state.putComment.data.votes,
//   loading: state.putComment.loading,
//   error: state.putComment.error,
// });

// const mapDispatchToProps = dispatch => ({
//   putComment: (id, vote) => {
//     dispatch(putComment(id, vote));
//   }
// });

Comment.propTypes = {
  comment: PT.object.isRequired,

};
// export default connect(mapStateToProps, mapDispatchToProps)(Comment);
export default Comment;