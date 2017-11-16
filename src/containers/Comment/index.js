import React, {Component} from 'react';
import PT from 'prop-types';
import CommentUI from '../../components/CommentUI';
import {connect} from 'react-redux';
import putComment from '../../actions/putComment';
import VotesUI from '../../components/VotesUI';
import FlatButton from 'material-ui/FlatButton';
class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      votes: this.props.comment.votes,
      deleted: false
    };
    this.handleClick = this.handleClick.bind(this);
  }
  componentWillReceiveProps(nextProps){
    this.setState({
      votes: nextProps.comment.votes
    });
  }
  handleClick(value){
    const {_id: id} = this.props.comment;
    let increment;
    value === 'up' ? increment = 1 : increment =-1;
    return () => {
      const {votes} = this.state;
      const {putComment} = this.props;
      putComment(id, value);
      this.setState({
        votes: votes + increment
      });
    };
  }
  render() {
    const {comment} = this.props;

    return (
      <div>
        <CommentUI comment={comment}/>
        <FlatButton label = 'delete' onClick = {this.props.handleDelete}/>
        <VotesUI votes = {this.state.votes} loading = {false} handleClick = {this.handleClick}/>

      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  putComment: (id, vote) => {
    dispatch(putComment(id, vote));
  }
});

Comment.propTypes = {
  comment: PT.object.isRequired,
  putComment: PT.func.isRequired,
  handleDelete: PT.func.isRequired
};
export default connect(null, mapDispatchToProps)(Comment);
// export default Comment;