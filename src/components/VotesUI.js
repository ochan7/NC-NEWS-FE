import React from 'react';
import PT from 'prop-types';
import Button from 'material-ui/Button';
const VotesUI = ({votes, handleClick, isDeleteAble, handleDelete}) => (
  <div className = 'vote-container'>
    <Button dense='true' disabled={true}><p className='vote-number'>{votes}</p></Button>
    <Button onClick={handleClick('up')} dense = 'true'>like</Button>
    <Button onClick={handleClick('down')} dense = 'true'>dislike</Button>
    {isDeleteAble && <Button onClick={handleDelete} dense = 'true' className='delete-button'>
    Delete
    </Button>}
  </div>
);

VotesUI.propTypes = {
  votes: PT.number.isRequired,
  handleClick: PT.func.isRequired,
  handleDelete: PT.func.isRequired,
  isDeleteAble: PT.bool.isRequired
};
export default VotesUI;