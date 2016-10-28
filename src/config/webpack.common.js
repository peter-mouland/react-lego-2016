const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const cssnano = require('cssnano');
const IsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');

const { SRC, DIST } = require('./paths');
const isomorphicConfig = require('../config/iso-config.js');
const vendorManifest = require('../../compiled/vendor-manifest.json');

const isomorphicPlugin = new IsomorphicToolsPlugin(isomorphicConfig);
const isDevelopment = process.env.NODE_ENV === 'development';

module.exports = {
  devtool: 'eval',
  cache: true,
  context: SRC,
  output: {
    path: DIST,
    filename: '[name].js',
    chunkFilename: '[name].js',
    publicPath: '/'
  },
  plugins: [
    new webpack.DllReferencePlugin({
      context: path.join(process.cwd(), 'src'),
      manifest: vendorManifest
    }),
    isomorphicPlugin.development(isDevelopment),
    new ExtractTextPlugin('[name].css'),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.PORT': JSON.stringify(process.env.PORT),
      'process.env.DEBUG': JSON.stringify(process.env.DEBUG),
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [
          cssnano({
            autoprefixer: {
              browsers: [
                'safari 9',
                'ie 10-11',
                'last 2 Chrome versions',
                'last 2 Firefox versions',
                'edge 13',
                'ios_saf 9.0-9.2',
                'ie_mob 11',
                'Android >= 4'
              ],
              cascade: false,
              add: true,
              remove: true
            },
            safe: true
          })
        ]
      }
    })
  ],
  resolve: {
    modules: ['node_modules', SRC],
    extensions: ['.js', '.jsx', '.scss']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        include: [/src/],
        loader: 'babel',
        query: {
          cacheDirectory: true
        }
      },
      {
        test: /\.scss$/,
        include: [/src/],
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: ['css', 'postcss', 'sass']
        })
      },
      {
        test: /\.svg$/,
        include: [/src/],
        loaders: ['svg-inline']
      }
    ]
  }
};
