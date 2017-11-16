import React from 'react';
import PT from 'prop-types';
import {Link} from 'react-router-dom';
const Paginator = ({size, pageSize, path}) => {

  return (
    <div>
      {Array(Math.ceil(size / pageSize)).fill(0).map((butn, index) => (
        <Link to = {`${path}${index+1}`} 
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
  path: PT.string.isRequired,
  pageSize: PT.number.isRequired
};
export default Paginator;