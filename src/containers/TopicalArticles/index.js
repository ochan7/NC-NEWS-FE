import React from 'react';
import PT from 'prop-types';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import getArticlesByTopic from '../../actions/getArticlesByTopic';
import Paginator from '../../components/Paginator';
import Loading from '../../components/Loading';
import HomePageUI from '../../components/HomePageUI';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import orange from 'material-ui/colors/orange';
import grey from 'material-ui/colors/grey';
import red from 'material-ui/colors/red';

const theme = createMuiTheme({
  palette: {
    primary: orange, // Purple and green play nicely together.
    secondary: grey,
    error: red,
  },
});
class TopicalArtcles extends React.Component {
  constructor (props) {
    super(props);
    const {params} = this.props.match;
    let page = 0;
    params.page !== undefined ? page = params.page - 1 : page  = 0;
    this.state = {
      page:  page,
      pageSize: 10
    };
  }
  componentWillMount(){
    const topic = this.props.match.params.topic;
    this.props.getArticlesByTopic(topic);
  }
  
  componentWillReceiveProps(nextProps){
    const {page, topic} = nextProps.match.params;
    if(this.props.match.params.page !== page) {
      this.setState({
        page: page - 1
      });
    }
    if (this.props.match.params.topic !== topic) {
      this.props.getArticlesByTopic(topic);
      this.setState({
        page: 0
      });
    }
  }
  render () {
    const {articles, loading, error, match : {params: {topic}}} = this.props;
    const {page} = this.state;
    return (
      <MuiThemeProvider theme = {theme}>
        {
          error && <Redirect to = '/404'/>
        }
        {
          loading ? <Loading/> :
            <div>
              <Paginator 
                size={articles.length}
                pageSize={this.state.pageSize}
                path = {`/topics/${topic}/articles/`}
                page = {page}
              />
              <HomePageUI 
                loading = {loading}
                articles={
                  articles.slice(
                    this.state.page * this.state.pageSize,
                    this.state.page * this.state.pageSize + this.state.pageSize
                  )}/>
            </div>
        }
      </MuiThemeProvider>
    );
  }
}

TopicalArtcles.propTypes = {
  match: PT.object.isRequired,
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
