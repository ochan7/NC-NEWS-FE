import React, {Component} from 'react';
import PT from 'prop-types';
import CommentUI from '../../components/CommentUI';
import {connect} from 'react-redux';
import putComment from '../../actions/putComment';
import VotesUI from '../../components/VotesUI';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Card from 'material-ui/Card';
class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      votes: this.props.comment.votes,
      deleted: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleIsDeleted = this.handleIsDeleted.bind(this);
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
  handleIsDeleted(){
    this.props.handleDelete();
    this.setState({
      deleted: true
    });
  }
  render() {
    const {comment, isDeleteAble} = this.props;
    const{deleted} = this.state;
    return (
      <Grid item xs = {10}>
        {!deleted?
          <Card >
            <CommentUI comment={comment}/>
            {isDeleteAble && <Button onClick = {this.handleIsDeleted}>DELETE</Button>}
            <VotesUI votes = {this.state.votes} loading = {false} handleClick = {this.handleClick}/>
          </Card>
          :<span/>
        }
      </Grid>
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
  handleDelete: PT.func.isRequired,
  isDeleteAble: PT.bool.isRequired
};
export default connect(null, mapDispatchToProps)(Comment);
// export default Comment;