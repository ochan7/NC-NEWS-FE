import React from 'react';
import Button from 'material-ui/Button';
import PT from 'prop-types';

import Grid from 'material-ui/Grid';
const VotesUI = ({votes, handleClick}) => (
  <Grid >
    <Button onClick={handleClick('up')}>
    UP
    </Button>
    <span>{votes}</span>
    <Button 
      onClick={handleClick('down')}
    >
    DOWN
    </Button>
  </Grid>
);

VotesUI.propTypes = {
  votes: PT.number.isRequired,
  handleClick: PT.func.isRequired
};
export default VotesUI;