'use strict'
var webpack = require('webpack')
var path = require('path')
var LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
var plugins = [
  new LodashModuleReplacementPlugin({
    'shorthands': true,
    'cloning': true,
    'currying': true,
    'caching': true,
    'collections': true,
    'paths': true,
    'guards': true,
    'unicode': true,
    'placeholders': true
  }),
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  })
]

if (process.env.NODE_ENV === 'production') {
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        screw_ie8: true,
        warnings: false
      }
    })
  )
  plugins.push(
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    })
  )
}

module.exports = {
  context: path.join(__dirname, 'lib'),
  entry: './contentful.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'contentful.js',
    libraryTarget: 'umd',
    library: 'contentful'
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /(node_modules|bower_components|dist)/,
        loader: 'babel-loader'
      }
    ]
  },
  plugins: plugins
}
