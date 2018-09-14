var merge = require('webpack-merge');

var commonConfig = require('./webpack.common-config');
var devConfig = require('./webpack.dev-config');
var prodConfig = require('./webpack.prod-config');

module.exports = (env, argv) =>
  argv.mode === 'development' ?
    merge(commonConfig, devConfig) :
    merge(commonConfig, prodConfig);
