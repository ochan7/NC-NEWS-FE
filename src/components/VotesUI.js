import React from 'react';
import PT from 'prop-types';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import ThumbUp from 'material-ui-icons/ThumbUp';
import ThumbDown from 'material-ui-icons/ThumbDown';
const VotesUI = ({votes, handleClick}) => (
  <Grid>
    <Typography className = 'vote-counter' type='cpation'>{votes}</Typography>
    <ThumbUp onClick={handleClick('up')}/>
    <span> </span>
    <ThumbDown onClick = {handleClick('down')}/>
  </Grid>
);

VotesUI.propTypes = {
  votes: PT.number.isRequired,
  handleClick: PT.func.isRequired
};
export default VotesUI;