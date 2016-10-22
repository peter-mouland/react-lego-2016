import React from 'react';
import { renderToString } from 'react-dom/server';
import debug from 'debug';

import Error500 from '../templates/Error500';

const log = debug('lego:server.js');

export default function pageRenderers() {
  return function* genAddRenderFunctions(next) {
    this.renderPageToString = function renderPageToString(page) {
      return `<!doctype html>${renderToString(page)}`;
    };
    this.render500 = function render500(e) {
      log('render500', e);
      this.response.status = 500;
      return this.renderPageToString(<Error500 />);
    };
    yield next;
  };
}
