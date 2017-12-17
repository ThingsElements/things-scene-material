const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  entry: {
    "things-scene-material": "./src/index.js",
    "things-scene-material-min": "./src/index.js"
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, '.')
  },
  resolve: {
    modules: [
      path.resolve(__dirname, 'node_modules'),
      path.resolve(__dirname, 'bower_components')
    ]
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: [],
      use: [{
        loader: 'babel-loader',
        options: {
          presets: ["es2015"]
        }
      }]
    }]
  },
  devServer: {
    contentBase: path.join(__dirname, '.'),
    compress: true,
    port: 8000
  },
  plugins:[
    new UglifyJSPlugin({
      test: /\-min\.js$/
    })
  ]
};
