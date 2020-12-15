const withImages = require('next-images');
module.exports = withImages({
  esModule: true,
  fileExtensions: ['jpg', 'jpeg', 'png', 'gif'],
  webpack(config, options) {
    return config;
  },
});
