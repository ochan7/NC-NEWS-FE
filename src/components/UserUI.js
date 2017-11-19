
import PT from 'prop-types';
import Loading from './Loading';


// export default UserUI;

import React from 'react';
import { withStyles } from 'material-ui/styles';
import classnames from 'classnames';
import Grid from 'material-ui/Grid';
import Card, { CardHeader, CardMedia, CardContent, CardActions } from 'material-ui/Card';
import Collapse from 'material-ui/transitions/Collapse';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import red from 'material-ui/colors/red';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import HomePageUI from './HomePageUI';
class UserUI extends React.Component {
  constructor(props) {
    super(props);
    this.state = { expanded: false };
    this.handleExpandClick = this.handleExpandClick.bind(this);
  }
  
  handleExpandClick() {
    this.setState({ expanded: !this.state.expanded });
  }
  
  render() {
    const { classes , user, loading, userData, userDataLoading} = this.props;
    
    return (
      
      <Grid>
        {loading ? <Loading/> :
          <Card className={classes.card}>
            <CardHeader
              title={user.name}
              subheader={user.username}
            />
            <CardMedia
              src = {user.avatar_url}
              component= 'img'
            />


            <CardContent>
              <Typography type="title">
              Articles by {user.name}
              </Typography>

              { !userDataLoading && <HomePageUI articles = {userData.articles} loading={false}/>}
            </CardContent>
            <CardActions disableActionSpacing>
              <div className={classes.flexGrow} />
              <IconButton
                className={classnames(classes.expand, {
                  [classes.expandOpen]: this.state.expanded,
                })}
                onClick={this.handleExpandClick}
                aria-expanded={this.state.expanded}
                aria-label="Show more"
              >
                <ExpandMoreIcon />
              </IconButton>
            </CardActions>
            <Collapse in={this.state.expanded} transitionDuration="auto" unmountOnExit>
              <CardContent>
                <Typography paragraph type="body2">
                Method:
                </Typography>
                <Typography paragraph>
                Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
                minutes.
                </Typography>
                <Typography paragraph>
                Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high
                heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly
                browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving
                chicken and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion,
                salt and pepper, and cook, stirring often until thickened and fragrant, about 10
                minutes. Add saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
                </Typography>
                <Typography paragraph>
                Add rice and stir very gently to distribute. Top with artichokes and peppers, and
                cook without stirring, until most of the liquid is absorbed, 15 to 18 minutes.
                Reduce heat to medium-low, add reserved shrimp and mussels, tucking them down into
                the rice, and cook again without stirring, until mussels have opened and rice is
                just tender, 5 to 7 minutes more. (Discard any mussels that don’t open.)
                </Typography>
                <Typography>
                Set aside off of the heat to let rest for 10 minutes, and then serve.
                </Typography>
              </CardContent>
            </Collapse>
          </Card>
        }
      </Grid>
    );
  }
}

const styles = theme => ({
  card: {
    maxWidth: 700,
  },
  media: {
    height: 194,
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  flexGrow: {
    flex: '1 1 auto',
  },
});
UserUI.propTypes = {
  user: PT.object.isRequired,
  loading: PT.bool.isRequired,
  userData: PT.object.isRequired,
  userDataLoading: PT.bool.isRequired
};

export default withStyles(styles)(UserUI);