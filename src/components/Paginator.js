import React from 'react';
import PT from 'prop-types';
const Paginator = ({size, handleClick, pageSize}) => {

  return (
    <div>
      {Array(Math.ceil(size / pageSize)).fill(0).map((butn, index) => (
        <button 
          key = {index}
          onClick = {handleClick}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};

Paginator.propTypes = {
  size: PT.number.isRequired,
  handleClick: PT.func.isRequired,
  pageSize: PT.number.isRequired
};
export default Paginator;