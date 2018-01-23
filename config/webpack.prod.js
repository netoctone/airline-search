const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');

module.exports = webpackMerge(commonConfig, {
  plugins: [
    new UglifyJsPlugin({
      beautify: false,
      comments: false
    })
  ]
});
