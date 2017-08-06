// @flow
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
        ],
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
    new HtmlWebpackPlugin({
      template: './website/index-template.html',
      files: {
        js: ['[name].bundle.js'],
      },
    }),
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
