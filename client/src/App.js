import React, { Component } from 'react';
import { Router } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles';

import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import configureStore, { history } from './state/configureStore';


import theme from './theme';
import 'react-perfect-scrollbar/dist/css/styles.css';
import './assets/scss/index.scss';

import Routes from './Routes';

const store = configureStore();

export default class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <ConnectedRouter history={history} >
            <Routes />
          </ConnectedRouter>
        </Provider>
      </ThemeProvider>
    );
  }
}
