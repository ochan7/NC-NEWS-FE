import React from 'react';
import PT from 'prop-types';
import {connect} from 'react-redux';
import getArticles from '../actions/getArticles';

class HomePage extends React.Component {
  componentDidMount(){
    this.props.getArticles();
  }
  render () {
    return (
      <div>
        this is the homepage
      </div>
    );
  }
}

HomePage.propTypes = {
  articles: PT.array.isRequired,
  loading: PT.bool.isRequired,
  error: PT.any,
  getArticles: PT.func.isRequired
};

const mapStateToProps = state => ({
  articles: state.getArticles.data,
  loading: state.getArticles.loading,
  error: state.getArticles.error
});
const mapDispatchToProps = dispatch => ({
  getArticles: () => {
    dispatch(getArticles());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
