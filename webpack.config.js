const path = require('path');

module.exports = {
  entry: "./src/index.js",
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.json', '.css']
  },
  output: {
    path: __dirname + "/client/assets",
    publicPath: "/",
    filename: "bundle.js"
  }
};
