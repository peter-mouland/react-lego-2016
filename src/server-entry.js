require('babel-polyfill');
const hook = require('css-modules-require-hook');

require('./config/environment');
const cssModulesConfig = require('./config/css-modules.conf.js');

hook(cssModulesConfig);

const server = require('./server/server');

server.listen(process.env.PORT, () => {
  console.log(`listening at http://localhost:${process.env.PORT}`); // eslint-disable-line
});
