const IsomorphicTools = require('webpack-isomorphic-tools');
const isomorphicConfig = require('../config/isoConfig.js');
const paths = require('../config/paths');

const isomorphicTools = new IsomorphicTools(isomorphicConfig);

module.exports = {
  server() {
    return isomorphicTools
      .server(paths.ROOT)
      .then(() => {
        const assets = isomorphicTools.assets();
        return {
          javascript: Object.keys(assets.javascript).map((asset) => assets.javascript[asset]),
          styles: Object.keys(assets.styles).map((asset) => assets.styles[asset]),
          assets: assets.assets
        };
      });
  }
};
