import React from 'react';
import PT from 'prop-types';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import getArticles from '../../actions/getArticles';

import Loading from '../../components/Loading';
import HomePageUI from '../../components/HomePageUI';
import Paginator from '../../components/Paginator';
class HomePage extends React.Component {
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
  componentDidMount(){
    this.props.getArticles();
  }
  componentWillReceiveProps(nextProps){
    const {page} = nextProps.match.params;
    if(this.props.match.params.page !== page) {
      this.setState({
        page: page - 1
      });
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
              <Paginator 
                size={articles.length}  
                pageSize={this.state.pageSize}
                path = '/home/'
              />
              <HomePageUI 
                articles={
                  articles.slice(
                    this.state.page * this.state.pageSize,
                    this.state.page * this.state.pageSize + this.state.pageSize
                  )}/>
              <Paginator 
                size={articles.length}  
                pageSize={this.state.pageSize}
                path = '/home/'
              />
            </div>
        }
      </div>
    );
  }
}

HomePage.propTypes = {
  match: PT.object.isRequired,
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
