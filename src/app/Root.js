import React from 'react';
import { MemoryRouter, BrowserRouter } from 'react-router';
import debug from 'debug';

import { makeRoutes } from './routes';
import { isBrowser } from './utils';

debug('lego:Root');

// exported to be used in tests
export const Router = isBrowser ? BrowserRouter : MemoryRouter;

export default class Root extends React.Component {
  render() {
    return <Router children={makeRoutes()} {...this.props} />;
  }
}
