import React from 'react';
import { renderToString } from 'react-dom/server';
import { ServerRouter, createServerRenderContext } from 'react-router';
import { Provider } from 'react-redux';

import configureStore from '../../app/store/configureStore';
import { makeRoutes } from '../../app/routes';

const createMarkup = (req, context, store) => renderToString(
  <Provider store={store}>
    <ServerRouter location={req.url} context={context} >
      {makeRoutes()}
    </ServerRouter>
  </Provider>
);

function setRouterContext() {
  return function* genSetRouterContext(next) {
    const store = configureStore();
    const context = createServerRenderContext();
    const markup = createMarkup(this.request, context, store);
    const result = context.getResult();
    if (result.redirect) {
      this.status = 301;
      this.redirect(result.redirect.pathname + result.redirect.search);
    } else {
      this.status = result.missed ? 404 : 200;
      this.initialState = store.getState();
      this.routerContext = (result.missed)
        ? createMarkup(this.request, context, store)
        : markup;
    }
    yield next;
  };
}

export default setRouterContext;
