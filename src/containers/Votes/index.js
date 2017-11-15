import VotesUI from '../../components/VotesUI';
import React, {Component} from 'react';
import PT from 'prop-types';
import {connect} from 'react-redux';
import putArticle from '../../actions/putArticle';
class Votes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      votes: this.props.article.votes
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(vote){
    const {putArticle, article: {_id: id}} = this.props;
    return () => putArticle(id, vote);
  }
  componentWillReceiveProps(nextProps){
    if(typeof nextProps.votes === 'number'){
      this.setState({
        votes: nextProps.votes
      });
    }
  }
  render () {
    const {loading} = this.props;
    return (
      <div>
        <VotesUI 
          votes ={
            this.state.votes
          }
          loading = {loading}
          handleClick = {this.handleClick}
        />
      </div>
    );
  }
}
Votes.propTypes = {
  article: PT.object.isRequired,
  loading: PT.bool.isRequired,
  error: PT.any.isRequired,
  putArticle: PT.func.isRequired,
  votes: PT.number.isRequired
};
const mapStateToProps = state => ({
  loading: state.putArticle.loading,
  votes: state.putArticle.data.votes,
  error: state.putArticle.error
});

const mapDispatchToProps = dispatch => ({
  putArticle: (id, vote) => {
    dispatch(putArticle(id,vote));
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(Votes);