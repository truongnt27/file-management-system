import React, { useEffect } from 'react';
import { ThemeProvider } from '@material-ui/styles';

import { Provider, useDispatch } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import configureStore, { history } from './state/configureStore';


import theme from './theme';
import 'react-perfect-scrollbar/dist/css/styles.css';
import './assets/scss/index.scss';

import Routes from './Routes';
import ToastNotification from 'components/ToastNotification';
import AppLoading from 'components/Loading/AppLoading';

const store = configureStore();

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <ConnectedRouter history={history} >
          <Routes />
        </ConnectedRouter>
        <ToastNotification />
        <AppLoading />
      </Provider>
    </ThemeProvider>
  );
}
export default App;
