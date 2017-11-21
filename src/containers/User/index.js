import React, {Component} from 'react';
import getUser from '../../actions/getUser';
import getUserData from '../../actions/getUserData';
import PT from 'prop-types';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import UserUI from '../../components/UserUI';
import Grid from 'material-ui/Grid';

class User extends Component {
  constructor (props) {
    super(props);
    this.state = {
      loading: true
    };
  }
  componentWillMount(){
    const {username} = this.props.match.params;
    const {getUser, getUserData} = this.props;
    getUser(username);
    getUserData(username);
  }
  componentWillReceiveProps(nextProps) {
    const {loading, user, userDataLoading} = nextProps;
    if(loading === false && user.length === 1 && userDataLoading === false) {
      this.setState({
        loading: false
      });
    }
  }
  render () {
    const {user, error, userData, userDataLoading} = this.props;
    return (

      <Grid container  >
        {error && <Redirect to ='/404'/>}
        <UserUI 
          loading={this.state.loading} 
          user={user[0]}
          userData={userData}
          userDataLoading={userDataLoading}
        />
      </Grid>
    );
  }
}
const mapStateToProps = state => ({
  loading: state.getUser.loading,
  user: state.getUser.data,
  error: state.getUser.error,
  userData: state.getUserData.data,
  userDataError: state.getUserData.error,
  userDataLoading: state.getUserData.loading
});

const mapDispatchToProps = dispatch => ({
  getUser: (username) => {
    dispatch(getUser(username));
  },
  getUserData: (username) => {
    dispatch(getUserData(username));
  }
});
User.propTypes = {
  getUser: PT.func.isRequired,
  match: PT.object.isRequired,
  loading: PT.bool.isRequired,
  user: PT.array.isRequired,
  error: PT.any.isRequired,
  getUserData: PT.func.isRequired,
  userDataLoading: PT.bool.isRequired,
  userData: PT.object.isRequired,
  userDataError: PT.any.isRequired
};
export default connect(mapStateToProps, mapDispatchToProps)(User);