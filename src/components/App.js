import React, {Component} from 'react';
import {Route, Switch, Link} from 'react-router-dom';
import HomePage from '../containers/HomePage/index';
import NoMatch from './NoMatch';
import Comments from '../containers/Comments/index';
import Navbar from './Navbar';
import TopicalArticles from '../containers/TopicalArticles/index';
import './App.css';
import User from '../containers/User/index';
import Grid from 'material-ui/Grid';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

class App extends Component {

  render () {
    return (
      <div>
        <AppBar position = "static" color = "inherit" className = 'title-header'>
          <Link className='link-class title-header' to = '/' >
            <h1 className='title-header' >
        Northcoders News
            </h1>
          </Link>
          <Navbar/>
        </AppBar>
        <Grid>
          <Switch>
            <Route exact path='/' component={HomePage} />
            <Route exact path='/home/:page' component={HomePage} />
            <Route exact path='/topics/:topic/articles' component={TopicalArticles}/>
            <Route exact path='/topics/:topic/articles/:page' component={TopicalArticles}/>
            <Route exact path='/user/:username' component={User}/>
            <Route exact path ='/articles/:article_id/comments' component={Comments}/>
            <Route exact path = '/404' component = {NoMatch}/>
            <Route path = '/*' component = {NoMatch}/>
          </Switch>
        </Grid>
      </div>
    );
  }
}

export default App;