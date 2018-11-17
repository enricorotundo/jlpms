const path = require("path");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const RobotstxtPlugin = require("robotstxt-webpack-plugin").default;

module.exports = {
  entry: ["./src/App.js"],
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html",
      favicon: "./src/favicon.png"
    }),
    new RobotstxtPlugin({
      userAgent: "*",
      disallow: ""
    })
  ]
};