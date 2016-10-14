/* eslint-disable import/no-extraneous-dependencies */
import webpack from 'webpack';
import Router from 'koa-router';
import webpackMiddleware from 'koa-webpack-dev-middleware';
import debug from 'debug';

import webpackConfig from '../../config/webpack.config.dev';

const log = {
  pack: debug('webpack'),
  hot: debug('hot-reload')
};

const compiler = webpack(webpackConfig);

const hotRouter = new Router();

hotRouter.use(webpackMiddleware(compiler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath,
  stats: {
    colors: true,
    reasons: false
  }
}));

hotRouter.use(require('koa-webpack-hot-middleware')(compiler, {
  log: log.pack,
  path: '/__webpack_hmr',
  heartbeat: 10 * 1000
}));

export default hotRouter;
