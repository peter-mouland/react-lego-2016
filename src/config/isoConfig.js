const paths = require('./paths');

module.exports = {
  webpack_assets_file_path: paths.ASSET_FILE,
  assets: {
    images: {
      extensions: [
        'jpeg', 'jpg', 'png', 'gif', 'svg'
      ]
    },
  }
};
