import React, {Component} from 'react';
import {Route, Switch } from 'react-router-dom';
import HomePage from '../containers/HomePage/index';
import { BrowserRouter } from 'react-router-dom';
import NoMatch from './NoMatch';
import Comments from '../containers/Comments/index';
import Navbar from './Navbar';
import TopicalArticles from '../containers/TopicalArticles/index';
import './App.css';
class App extends Component {

  render () {
    return (
      <BrowserRouter>
        <div>
          <h1>Northcoders News</h1>
          <Navbar/>
          <Switch>
            <Route exact path='/' component={HomePage} />
            <Route exact path='/topics/:topic/articles' component={TopicalArticles}/>
            <Route exact path ='/articles/:article_id/comments' component={Comments}/>
            <Route path = '/404' component = {NoMatch}/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;