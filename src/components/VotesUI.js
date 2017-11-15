import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import PT from 'prop-types';
import Loading from '../components/Loading';

const VotesUI = ({votes, loading, handleClick}) => (
  <div>
    <FlatButton 
      label='UP'
      onClick={handleClick('up')}
    />
    {
      loading ? 
        <Loading/>:
        <div>
          <span>{votes}</span>
        </div>
    }
    <FlatButton 
      label='DOWN'
      onClick={handleClick('down')}
    />
  </div>
);

VotesUI.propTypes = {
  votes: PT.number.isRequired,
  loading: PT.bool.isRequired,
  handleClick: PT.func.isRequired
};
export default VotesUI;