import React from 'react';
import { renderToString } from 'react-dom/server';
import { ServerRouter, createServerRenderContext } from 'react-router';
import { Provider } from 'react-redux';
import { matchRoutesToLocation } from 'react-router-addons-routes';

import configureStore from '../../app/store/configure-store';
import { makeRoutes, routes } from '../../app/routes';

const createMarkup = (req, context, store) => renderToString(
  <Provider store={store}>
    <ServerRouter location={req.url} context={context} >
      {makeRoutes()}
    </ServerRouter>
  </Provider>
);

function getContext(req, catcher) {
  const { matchedRoutes, params } = matchRoutesToLocation(routes, { pathname: req.url });
  const promises = matchedRoutes.filter((route) => route.component.needs)
    .map((route) => route.component.needs.map((need) => need(params)));
  return Promise.all(promises).catch(catcher);
}

// todo: stop rendering 404 on server api :(
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
      getContext(this.request, (err) => this.render500(err))
        .then(() => {
          this.status = result.missed ? 404 : 200;
          this.initialState = store.getState();
          this.routerContext = (result.missed)
            ? createMarkup(this.request, context, store)
            : markup;
        });
    }
    yield next;
  };
}

export default setRouterContext;
