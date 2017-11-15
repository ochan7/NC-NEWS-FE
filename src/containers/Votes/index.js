import VotesUI from '../../components/VotesUI';
import React, {Component} from 'react';
import PT from 'prop-types';

class Votes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      votes: this.props.votes
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(vote){
    const {putData, id} = this.props;
    return () => putData(id, vote);
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
  id: PT.string.isRequired,
  loading: PT.bool.isRequired,
  error: PT.any.isRequired,
  putData: PT.func.isRequired,
  votes: PT.number.isRequired
};

export default Votes;