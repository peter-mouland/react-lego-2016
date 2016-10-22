import koa from 'koa';
import debug from 'debug';
import compress from 'koa-compress';

import handleError from './middleware/handle-error';
import logger from './middleware/logger';
import responseTime from './middleware/response-time';
import pageRenderers from './middleware/page-renderers';
import headers from './middleware/headers';
import webpackConfig from '../config/webpack.config.prod';
import { router, setRoutes } from './router';

const server = koa();
const log = debug('lego:server.js');
log('starting');

const webpackEntries = Object.keys(webpackConfig.entry);
const assets = {
  javascript: webpackEntries.map((entry) => `/${entry}.js`),
  styles: webpackEntries.map((entry) => `/${entry}.css`)
};

server.use(handleError('render500'));
server.use(responseTime());
server.use(compress({ threshold: 2048 }));
server.use(logger());
server.use(headers());
server.use(pageRenderers());

setRoutes(assets);
server.use(router.routes());

export default server;
