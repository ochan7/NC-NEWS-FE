import React from 'react';
import PT from 'prop-types';
import {Link} from 'react-router-dom';
import Button from 'material-ui/Button';
// import IconButton from 'material-ui/IconButton';
// import DeleteIcon from 'material-ui-icons/Delete';
const Paginator = ({size, pageSize, path , page}) => {
  const numPages = Math.ceil(size / pageSize);
  let prevPage = page === 0 ? 1 : page;
  let nextPage = page === numPages - 1 ? page + 1: page + 2;
  return (
    <div className = 'pagination'>

      <Link to = {`${path}${prevPage}`} 
        className='link-class'
      >
        <Button 
        >
          previous
        </Button>
      </Link>

      {Array(numPages).fill(0).map((butn, index) => (
        <Link to = {`${path}${index+1}`} 
          key = {index}
          className='link-class'
        >
          <Button 
          >
            {index + 1}
          </Button>
        </Link>
      ))}
      <Link to = {`${path}${nextPage}`} 
        className='link-class'
      >
        <Button 
        >
        next
        </Button>
      </Link>
    </div>
  );
};

Paginator.propTypes = {
  size: PT.number.isRequired,
  path: PT.string.isRequired,
  pageSize: PT.number.isRequired,
  page: PT.number.isRequired
};
export default Paginator;