import React, {Component} from 'react';
import PT from 'prop-types';
import {connect} from 'react-redux';
import postComment from '../../actions/postComment';
import PostCommentUI from '../../components/PostCommentUI';

class PostComment extends Component {
  render() {

    return (
      <div>
        <PostCommentUI/>
      </div>
    );
  }
}
PostComment.propTypes = {
  article: PT.array.isRequired,
  postComment: PT.func.isRequired,
  // comment: PT.object.isRequired,
  // error: PT.any.isRequired,
  // loading: PT.bool.isRequired
};

// const mapStateToProps = state => ({
//   comment: state.postComment.data,
//   loading: state.postComment.loading,
//   error: state.postComment.error
// });

const mapDispatchToProps = dispatch => ({
  postComment: (article_id, comment) => {
    dispatch(postComment(article_id, comment));
  }
});
export default connect(null, mapDispatchToProps)(PostComment);