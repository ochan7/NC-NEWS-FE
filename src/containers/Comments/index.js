import React, {Component} from 'react';
import PT from 'prop-types';
import {connect} from 'react-redux';
import getComments from '../../actions/getComments';

class Comments extends Component {
  componentDidMount(){
    const article_id = this.props.location.state._id;
    this.props.getComments(article_id);
  }
  render () {
    return (
      <div>
        put the comments here
      </div>
    );
  }
}
Comments.propTypes = {
  comments: PT.array.isRequired,
  loading: PT.bool.isRequired,
  error: PT.any,
  getComments: PT.func.isRequired
};

const mapStateToProps = state => {
  const {data, loading, error} = state.getComments;
  return {
    comments: data,
    loading,
    error
  };
};
const mapDispatchToProps = dispatch => ({
  getComments: (article_id) => {
    dispatch(getComments(article_id));
  } 
});
export default connect(mapStateToProps, mapDispatchToProps)(Comments);