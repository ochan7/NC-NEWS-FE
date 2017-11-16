import React, {Component} from 'react';
import {Route, Switch } from 'react-router-dom';
import HomePage from '../containers/HomePage/index';
import NoMatch from './NoMatch';
import Comments from '../containers/Comments/index';
import Navbar from './Navbar';
import TopicalArticles from '../containers/TopicalArticles/index';
import './App.css';
import User from '../containers/User/index';
class App extends Component {

  render () {
    return (
      <div>
        <h1>Northcoders News</h1>
        <Navbar/>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/home/:page' component={HomePage} />
          <Route exact path='/topics/:topic/articles' component={TopicalArticles}/>
          <Route exact path='/topics/:topic/articles/:page' component={TopicalArticles}/>
          <Route exact path='/user/:username' component={User}/>
          <Route exact path ='/articles/:article_id/comments' component={Comments}/>
          <Route exact path = '/404' component = {NoMatch}/>
        </Switch>
      </div>
    );
  }
}

export default App;