import React, {Component} from 'react';
import getUser from '../../actions/getUser';
import PT from 'prop-types';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import Loading from '../../components/Loading';
class User extends Component {
  constructor (props) {
    super(props);
    this.state = {
      user: {},
      loading: true,
      error: null
    };
  }
  componentDidMount(){
    const {username} = this.props.match.params;
    this.props.getUser(username);
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.user.length === 1) {
      this.setState({
        user: nextProps.user[0],
        loading: nextProps.loading,
        error: nextProps.error
      });
    }
  }
  render () {
    const {user, loading, error} = this.state;
    return (

      <div>
        {error && <Redirect to ='/404'/>}
        {loading ? <Loading/>:
          <h3>{user.name} {user.username}</h3>
        }
      </div>
    );
  }
}
const mapStateToProps = state => ({
  loading: state.getUser.loading,
  user: state.getUser.data,
  error: state.getUser.error
});

const mapDispatchToProps = dispatch => ({
  getUser: (username) => {
    dispatch(getUser(username));
  }
});
User.propTypes = {
  getUser: PT.func.isRequired,
  match: PT.object.isRequired,
  loading: PT.bool.isRequired,
  user: PT.object.isRequired,
  error: PT.any.isRequired
};
export default connect(mapStateToProps, mapDispatchToProps)(User);