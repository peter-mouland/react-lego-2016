import React from 'react';
import { renderToString } from 'react-dom/server';
import { ServerRouter, createServerRenderContext } from 'react-router';
import { makeRoutes } from '../../app/routes';

const createMarkup = (req, context) => renderToString(
  <ServerRouter location={req.url} context={context} >
    {makeRoutes()}
  </ServerRouter>
);

function setRouterContext() {
  return function* genSetRouterContext(next) {
    const context = createServerRenderContext();
    const markup = createMarkup(this.request, context);
    const result = context.getResult();
    if (result.redirect) {
      this.status = 301;
      this.redirect(result.redirect.pathname + result.redirect.search);
    } else {
      this.status = result.missed ? 404 : 200;
      this.routerContext = (result.missed)
        ? createMarkup(this.request, context)
        : markup;
    }
    yield next;
  };
}

export default setRouterContext;
