import React from 'react';
import {Link} from 'react-router-dom';
import Topics from '../containers/Topics/index';
import Grid from 'material-ui/Grid';
const Navbar = () => (
  <Grid>
    <Link to = '/'>HOME</Link>
    <Topics/>
  </Grid>
);

export default Navbar;