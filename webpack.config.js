var path = require('path');

module.exports = {

  entry: './src/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist')
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
      }
    ]
  }

};
