/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseConfig = require('./webpack.base.config');

const devConfig = {
  mode: 'development',
  output: {
    path: path.resolve('./dist/client'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './build/template/index.ejs',
      favicon: './build/template/favicon.ico',
      env: process.env.NODE_ENV,
    }),
  ],
};

module.exports = merge(baseConfig, devConfig);
