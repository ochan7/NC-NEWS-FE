import React, {Component} from 'react';
import PT from 'prop-types';
import {connect} from 'react-redux';
import getComments from '../../actions/getComments';
import CommentsUI from '../../components/CommentsUI';
import Loading from '../../components/Loading';
import {Redirect} from 'react-router-dom';
class Comments extends Component {
  componentDidMount(){
    const article_id = this.props.location.state._id;
    this.props.getComments(article_id);
  }
  render () {
    const {comments, loading, error} = this.props;
    return (
      <div>
        {
          error && <Redirect to = '/404'/>
        }
        {
          loading ? <Loading/> :
            <div>
              <CommentsUI
                article = {this.props.location.state}
                comments = {comments}
              />
            </div>
        }
      </div>
    );
  }
}
Comments.propTypes = {
  location: PT.object.isRequired,
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