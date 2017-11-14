import React, {Component} from 'react';
// import PT from 'prop-types';
// import {connect} from 'react-redux';
// import postComment from '../../actions/postComment';
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

export default PostComment;