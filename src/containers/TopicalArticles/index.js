import React from 'react';
import PT from 'prop-types';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import getArticlesByTopic from '../../actions/getArticlesByTopic';

import Loading from '../../components/Loading';
import HomePageUI from '../../components/HomePageUI';
class TopicalArtcles extends React.Component {

  componentDidMount(){
    const topic = this.props.match.params.topic;
    this.props.getArticlesByTopic(topic);
  }
  componentWillReceiveProps(nextProps) { 
    if (this.props.match.params.topic !== nextProps.match.params.topic) {
      this.props.getArticlesByTopic(nextProps.match.params.topic);
    }
  }
  render () {
    const {articles, loading, error} = this.props;
    return (
      <div>
        {
          error && <Redirect to = '/404'/>
        }
        {
          loading ? <Loading/> :
            <div>
              <HomePageUI 
                articles={articles}/>
            </div>
        }
      </div>
    );
  }
}

TopicalArtcles.propTypes = {
  articles: PT.array.isRequired,
  loading: PT.bool.isRequired,
  error: PT.any,
  getArticlesByTopic: PT.func.isRequired
};

const mapStateToProps = state => ({
  articles: state.getArticlesByTopic.data,
  loading: state.getArticlesByTopic.loading,
  error: state.getArticlesByTopic.error
});
const mapDispatchToProps = dispatch => ({
  getArticlesByTopic: (topic) => {
    dispatch(getArticlesByTopic(topic));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(TopicalArtcles);
