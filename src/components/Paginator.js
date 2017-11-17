import React from 'react';
import PT from 'prop-types';
import {Link} from 'react-router-dom';
import Button from 'material-ui/Button';
const Paginator = ({size, pageSize, path}) => {

  return (
    <div>
      {Array(Math.ceil(size / pageSize)).fill(0).map((butn, index) => (
        <Link to = {`${path}${index+1}`} 
          key = {index}
          className='link-class'
        >
          <Button>
            {index + 1}
          </Button>
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