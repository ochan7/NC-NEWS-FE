import React, {Component} from 'react';
import PT from 'prop-types';
import CommentUI from '../../components/CommentUI';
import {connect} from 'react-redux';
import putComment from '../../actions/putComment';
import VotesUI from '../../components/VotesUI';
import Grid from 'material-ui/Grid';
import Card, {CardActions} from 'material-ui/Card';
class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      votes: this.props.comment.votes,
      deleted: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
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
  handleDelete(){
    this.props.handleDelete();
    this.setState({
      deleted: true
    });
  }
  render() {
    const {comment, isDeleteAble} = this.props;
    const{deleted} = this.state;
    return (
      <Grid item xs= {11}>
        {!deleted && <div className = 'comments-container'>
          <Card>
            <CommentUI comment={comment}/>
            <CardActions>
              <VotesUI votes = {this.state.votes} loading = {false} handleClick = {this.handleClick}
                isDeleteAble={isDeleteAble}
                handleDelete={this.handleDelete}/>
            </CardActions>
          </Card> 
        </div>
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