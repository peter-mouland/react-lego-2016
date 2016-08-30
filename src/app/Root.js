import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter, BrowserRouter } from 'react-router';
import debug from 'debug';

import { makeRoutes } from './routes';
import configureStore from './store/configureStore';
import { isBrowser } from './utils';

debug('lego:Root');

// exported to be used in tests
export const Router = isBrowser ? BrowserRouter : MemoryRouter;
const store = configureStore(window.__INITIAL_STATE__); // eslint-disable-line

export default class Root extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router children={makeRoutes()} {...this.props} />;
      </Provider>
      )
  }
}
