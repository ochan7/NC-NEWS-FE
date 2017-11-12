import React, {Component} from 'react';
import {Route, Switch } from 'react-router-dom';
import HomePage from './HomePage';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
class App extends Component {

  render () {
    return (
      <BrowserRouter>
        <div>
          <h1>this is the app component</h1>
          <Switch>
            <Route exact path='/' component={HomePage} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;