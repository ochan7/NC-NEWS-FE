import React, {Component} from 'react';
import PT from 'prop-types';
import {connect} from 'react-redux';
import getTopics from '../../actions/getTopics';
import Loading from '../../components/Loading';
import TopicsUI from '../../components/TopicsUI';
import {Redirect} from 'react-router-dom';
import Grid from 'material-ui/Grid';
class Topics extends Component {
  constructor (props) {
    super(props);
  }

  componentDidMount(){
    this.props.getTopics();
  }
  render () {
    const {topics, loading, error} = this.props;
    return (
      <Grid>
        {
          error && <Redirect to ='/404'/>
        }
        {
          loading ? <Loading/> :
            <TopicsUI topics = {topics}/>
        }
      </Grid>
    );
  }
}
Topics.propTypes = {
  topics: PT.array.isRequired,
  loading: PT.bool.isRequired,
  error: PT.any,
  getTopics: PT.func.isRequired
};

const mapStateToProps = state => ({
  topics: state.getTopics.data,
  loading: state.getTopics.loading,
  error: state.getTopics.error
});
const mapDispatchToProps = dispatch => ({
  getTopics: () => {
    dispatch(getTopics());
  }
});
  
export default connect(mapStateToProps, mapDispatchToProps)(Topics);