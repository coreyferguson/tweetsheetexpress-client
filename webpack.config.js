
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
   'react': 'React',
   'react-dom': 'ReactDOM',
   'react-router-dom': 'ReactRouterDOM',
   'axios': 'axios'
  },

  module: webpackModule,

  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    // compress: true,
    port: 3000
  }
};
