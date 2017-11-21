
import PT from 'prop-types';
import Loading from './Loading';
import React from 'react';
import Grid from 'material-ui/Grid';
import Card, { CardHeader, CardMedia, CardContent } from 'material-ui/Card';
import HomePageUI from './HomePageUI';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: 30,
  },
  card: {
    padding: 16,
    textAlign: 'center',
    color: theme.palette.text.primary,
    maxWidth: 500,
    minWidth: 300
  },
  article: {
    padding: 16,
    textAlign: 'center',
    maxWidth: 800,
    minWidth: 300
  }
});
class UserUI extends React.Component {
  render() {
    const {  user, loading, userData, userDataLoading, classes} = this.props;
    return (
      <div className={classes.root}>

        <Grid container  spacing = {24}  align='center' >
          <Grid item xs>
            {loading || userDataLoading ?
              <Loading/>
              : 
              <Card className = {classes.card}>
                <CardHeader
                  title = {user.name}
                  subheader = {user.username}
                />
                <CardMedia
                  src = {user.avatar_url}
                  component = 'img'
                />
              </Card>
            }
          </Grid>
          <Grid item xs >
            {!loading && <Card className={classes.article}>
              <CardHeader
                title = {'Articles by ' + user.name}
              />
              <CardContent>
                <HomePageUI articles = {userData.articles} loading={false}/>
              </CardContent>
            </Card>}
          </Grid>
        </Grid>
      </div>
      
    );
  }
}

UserUI.propTypes = {
  classes: PT.object.isRequired,
  user: PT.object.isRequired,
  loading: PT.bool.isRequired,
  userData: PT.object.isRequired,
  userDataLoading: PT.bool.isRequired
};

export default withStyles(styles)(UserUI);