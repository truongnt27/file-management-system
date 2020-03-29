import { createBrowserHistory } from 'history';
import { applyMiddleware, compose, createStore } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import createRootReducer from './rootReducer';
import createSagaMiddleware from 'redux-saga';
import mySaga from './sagas';

export const history = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware();
// sagaMiddleware.run(mySaga);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configureStore(preloadedState) {
  const store = createStore(
    createRootReducer(history), // root reducer with router state
    preloadedState,
    composeEnhancers(
      applyMiddleware(
        routerMiddleware(history), // for dispatching history actions
        sagaMiddleware
      ),
    ),
  )

  return store;
}