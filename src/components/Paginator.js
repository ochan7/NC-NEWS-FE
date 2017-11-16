import React from 'react';
import PT from 'prop-types';
import {Link} from 'react-router-dom';
const Paginator = ({size, pageSize}) => {

  return (
    <div>
      {Array(Math.ceil(size / pageSize)).fill(0).map((butn, index) => (
        <Link to = {`/home/${index+1}`} 
          key = {index}
        >
          {index + 1}
        </Link>
      ))}
    </div>
  );
};

Paginator.propTypes = {
  size: PT.number.isRequired,

  pageSize: PT.number.isRequired
};
export default Paginator;