
const path = require('path');
const webpackModule = require('./config/webpack-module');

const environment = process.env.NODE_ENV || 'dev';
const envConfig = path.resolve(__dirname, `./config/${environment}.json`);

module.exports = {

  entry: './src/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist')
  },

  resolve: {
    alias: {
      config: envConfig,
    },
  },

  externals: {
   'axios': true,
   'moment': true,
   'react': 'React',
   'react-dom': 'ReactDOM',
   'react-redux': 'ReactRedux',
   'react-router': 'ReactRouter',
   'react-router-dom': 'ReactRouterDOM',
   'redux': 'Redux'
  },

  module: webpackModule,

  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    // compress: true,
    port: 3000
  }
};
