
const path = require('path');

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
   'react-router': 'ReactRouter',
   'axios': 'axios'
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'react']
          }
        }
      },
      {
        test: /\.scss$/,
        use: [{
            loader: "style-loader" // creates style nodes from JS strings
        }, {
            loader: "css-loader" // translates CSS into CommonJS
        }, {
            loader: "sass-loader" // compiles Sass to CSS
        }]
      }
    ]
  },

  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    compress: true,
    port: 3000
  }
};
