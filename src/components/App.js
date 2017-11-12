import React, {Component} from 'react';
import {Route, Switch } from 'react-router-dom';
import HomePage from '../containers/HomePage/index';
import { BrowserRouter } from 'react-router-dom';
import NoMatch from './NoMatch';
import './App.css';
class App extends Component {

  render () {
    return (
      <BrowserRouter>
        <div>
          <h1>this is the app component</h1>
          <Switch>
            <Route exact path='/' component={HomePage} />
            <Route path = '/404' component = {NoMatch}/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;