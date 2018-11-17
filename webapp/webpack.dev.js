const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const env = require('./env.dev.json');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    historyApiFallback: true,
    host: '0.0.0.0' // set the webserver accessible externally
  },
  plugins: [
    new webpack.DefinePlugin({
      API_URL: JSON.stringify(env.API_URL)
    })
  ]
});