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
    const {putArticle, article : {_id: article_id}} = this.props;
    return () => putArticle(article_id, vote);
  }
  componentWillReceiveProps(nextProps){
    if(typeof nextProps.votes === 'number'){
      this.setState({
        votes: nextProps.votes
      });
    }
  }
  render () {
    return (
      <div>
        <VotesUI 
          votes ={this.state.votes}
          loading = {this.props.loading}
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
  votes: state.putArticle.data.votes,
  loading: state.putArticle.loading,
  error: state.putArticle.error   
});
const mapDispatchToProps = dispatch => ({
  putArticle: (article_id, vote) => {
    dispatch(putArticle(article_id, vote));
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(Votes);