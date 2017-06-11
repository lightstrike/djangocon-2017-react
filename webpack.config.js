// @flow
const path = require('path');
const webpack = require('webpack');

module.exports = {
  context: __dirname,
  entry: {
    website: './website/AppRoot.jsx',
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
      },
    ],
  },
  resolve: {
    alias: {
      website: path.resolve(__dirname, 'website'),
    },
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    contentBase: './build',
    historyApiFallback: true,
    hot: true,
    port: 3000,
    publicPath: '/',
    disableHostCheck: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
      },
    },
  },
};
