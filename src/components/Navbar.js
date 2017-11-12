import React from 'react';
import {Link} from 'react-router-dom';
import Topics from '../containers/Topics/index';
const Navbar = () => (
  <div>
    <Link to = '/'>HOME</Link>
    <Topics/>
  </div>
);

export default Navbar;