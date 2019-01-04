const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const env = require('./env.stag.json');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('staging'),
      API_URL: JSON.stringify(env.API_URL)
    })
  ]
});