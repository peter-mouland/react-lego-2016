import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import * as routes from '../../app/routes';

function setRouterContext() {
  return function* genSetRouterContext(next) {
    match({
      routes: routes.makeRoutes(),
      location: this.request.url
    }, (error, redirect, renderProps) => {
      if (error) {
        this.status = 500;
        throw error;
      } else if (redirect) {
        this.status = 302;
        this.redirect(redirect.pathname + redirect.search);
      } else {
        // path * will return a 404
        const isNotFound = renderProps.routes.find((route) => route.path === '*');
        this.status = isNotFound ? 404 : 200;
        this.routerContext = renderToString(<RouterContext {...renderProps} />);
      }
    });
    yield next;
  };
}

export default setRouterContext;
