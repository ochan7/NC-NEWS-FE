import React from 'react';
import Button from 'material-ui/Button';
import PT from 'prop-types';
import Loading from '../components/Loading';

const VotesUI = ({votes, loading, handleClick}) => (
  <div>
    <Button
      onClick={handleClick('up')}
    >
    UP
    </Button>
    {
      loading ? 
        <Loading/>:
        <div>
          <span>{votes}</span>
        </div>
    }
    <Button 
      onClick={handleClick('down')}
    >
    DOWN
    </Button>
  </div>
);

VotesUI.propTypes = {
  votes: PT.number.isRequired,
  loading: PT.bool.isRequired,
  handleClick: PT.func.isRequired
};
export default VotesUI;