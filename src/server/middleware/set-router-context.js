/* eslint-disable no-param-reassign */
import React from 'react';
import { renderToString } from 'react-dom/server';
import { ServerRouter, createServerRenderContext } from 'react-router';
import { makeRoutes } from '../../app/routes';

const createMarkup = (req, context) => renderToString(
  <ServerRouter location={req.url} context={context} >
    {makeRoutes()}
  </ServerRouter>
);

const setRouterContext = (req, res, next) => {
  const context = createServerRenderContext();
  const markup = createMarkup(req, context);
  const result = context.getResult();
  if (result.redirect) {
    res.redirect(301, result.redirect.pathname + result.redirect.search);
  } else {
    res.status(result.missed ? 404 : 200);
    res.routerContext = (result.missed) ? createMarkup(req, context) : markup;
    next();
  }
};

export default setRouterContext;
