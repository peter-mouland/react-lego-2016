import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import reducers from '../reducers';
import promiseMiddleware from './promise-middleware';

const inBrowser = typeof window === 'object';
const middleware = [
  thunk,
  promiseMiddleware,
  createLogger({
    predicate: () => inBrowser && process.env.NODE_ENV !== 'production',
    collapsed: true
  })
];

export default function configureStore(initialState) {
  const store = createStore(
    reducers,
    initialState,
    applyMiddleware(...middleware)
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers'); // eslint-disable-line global-require

      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
