'use strict'
const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = () => ({
  devtool: 'sourcemap',
  entry: {
    content: './source/content',
    background: './source/background'
  },
  output: {
    path: path.join(__dirname, 'distribution'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: '*',
        context: 'source',
        ignore: '*.js'
      },
      {
        from: 'node_modules/webextension-polyfill/dist/browser-polyfill.min.js'
      }
    ])
  ],
  optimization: {
    // Without this, function names will be garbled and enableFeature won't work
    concatenateModules: true,

    // Automatically enabled on prod; keeps it somewhat readable for AMO reviewers
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          mangle: false,
          compress: false,
          output: {
            beautify: true,
            indent_level: 2 // eslint-disable-line camelcase
          }
        }
      })
    ]
  }
})
