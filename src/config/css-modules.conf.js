const sass = require('node-sass');

module.exports = {
  devMode: process.env.NODE_ENV === 'development',
  generateScopedName: '[path]___[name]__[local]___[hash:base64:5]',
  extensions: ['.scss'],
  preprocessCss: (data, filename) =>
    sass.renderSync({
      data,
      file: filename,
    }).css,
};
