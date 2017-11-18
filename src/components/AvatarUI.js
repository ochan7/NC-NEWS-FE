import React from 'react';
import PT from 'prop-types';
import Loading from './Loading';
import Avatar from 'material-ui/Avatar';
const AvatarUI  = ({loading, data}) => (
  <div>
    {loading ? <Loading/> :
      <img
        src={data ? data.avatar_url : ''}
        alt="avatar image"
      />
    }
  </div>
);

AvatarUI.propTypes = {
  loading: PT.bool.isRequired,
  data: PT.any.isRequired
};
export default AvatarUI;