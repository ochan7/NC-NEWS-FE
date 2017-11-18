import React from 'react';
import PT from 'prop-types';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import ThumbUp from 'material-ui-icons/ThumbUp';
import ThumbDown from 'material-ui-icons/ThumbDown';
const VotesUI = ({votes, handleClick}) => (
  <div>
    <Button onClick={handleClick('up')} dense='true'>
      <ThumbUp/>
    </Button>
    <Button disabled = 'true' dense= 'true' color='primary'>
      <Typography className = 'vote-counter' type='title'>{votes}</Typography>
    </Button>
    <Button
      dense = 'true'
      onClick={handleClick('down')}>
      <ThumbDown/>
    </Button>
  </div>
);

VotesUI.propTypes = {
  votes: PT.number.isRequired,
  handleClick: PT.func.isRequired
};
export default VotesUI;