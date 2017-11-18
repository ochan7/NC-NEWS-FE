import React, {Component} from 'react';
import PT from 'prop-types';
import {connect} from 'react-redux';
import postComment from '../../actions/postComment';
import PostCommentUI from '../../components/PostCommentUI';

class PostComment extends Component {
  constructor (props) {
    super (props);
    this.state = {
      input: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }
  handleChange(e){
    const newText = e.target.value;
    this.setState({
      input: newText 
    });
  }
  handleSubmit(){
    const {_id: article_id} = this.props.article;
    const {input: comment} = this.state;
    this.props.postComment(article_id, comment);
    this.setState({
      input: ''
    });
  }
  handleKeyPress(e){
    if(e.keyCode === 13) {
      this.handleSubmit();
    }
  }
  render() {

    return (
      <div>
        <PostCommentUI 
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          handleKeyPress={this.handleKeyPress}
          value = {this.state.input}
        />
      </div>
    );
  }
}
PostComment.propTypes = {
  article: PT.object.isRequired,
  postComment: PT.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  postComment: (article_id, comment) => {
    dispatch(postComment(article_id, comment));
  }
});
export default connect(null, mapDispatchToProps)(PostComment);