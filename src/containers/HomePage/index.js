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
    this.state = {
      page: 0,
      pageSize: 10
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(e){
    const newPage = +e.target.innerHTML - 1;
    this.setState({
      page: newPage
    });
  }
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
          loading ? <Loading/> :
            <div>
              <HomePageUI 
                articles={
                  articles.slice(
                    this.state.page * this.state.pageSize,
                    this.state.page * this.state.pageSize + this.state.pageSize
                  )}/>
              <Paginator size={articles.length} handleClick={this.handleClick} pageSize={this.state.pageSize}/>
            </div>
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
