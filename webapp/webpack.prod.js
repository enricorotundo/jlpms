const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const env = require('./env.prod.json');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      API_URL: JSON.stringify(env.API_URL),
      'process.env.GA_TRACKING_ID': JSON.stringify(env.GA_TRACKING_ID)
    })
  ]
});