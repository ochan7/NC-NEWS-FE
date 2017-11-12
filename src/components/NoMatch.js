import React from 'react';
import {Link} from 'react-router-dom';

const NoMatch = () => (
  <div>
    <h1>Something went wrong</h1>
    <Link to='/'>Go back to home</Link>
  </div>
);

export default NoMatch;