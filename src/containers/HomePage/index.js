import React from 'react';
import PT from 'prop-types';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import getArticles from '../../actions/getArticles';

import Loading from '../../components/Loading';
import HomePageUI from '../../components/HomePageUI';

class HomePage extends React.Component {
  componentDidMount(){
    this.props.getArticles();
  }
  render () {
    const {articles, loading, error} = this.props;
    return (
      <div>
        {
          error && <Redirect to = '/404'/>
        }
        {
          loading ? <Loading/> : <HomePageUI articles={articles}/>
        }
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
