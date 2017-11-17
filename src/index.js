import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import store from './store';
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <MuiThemeProvider >
        <App/>
      </MuiThemeProvider>
    </BrowserRouter>
  </Provider>, 
  document.getElementById('root')
);