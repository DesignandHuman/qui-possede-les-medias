'use strict'
const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const ChromeExtensionReloader = require('webpack-chrome-extension-reloader')

module.exports = (env, argv) => ({
  devtool: 'source-map',
  entry: {
    'content-script': './source/content',
    background: './source/background',
    popup: './source/popup',
    options: './source/options'
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
        use: {
          loader: 'babel-loader',
          options: {
            plugins: ['@babel/plugin-syntax-dynamic-import']
          }
        }
      }
    ]
  },
  plugins: (argv.mode === 'development' ? [new ChromeExtensionReloader()] : []).concat([
    new CopyWebpackPlugin([
      {
        from: '*',
        context: 'source',
        ignore: ['*.js', 'data.json']
      },
      {
        from: 'node_modules/webextension-polyfill/dist/browser-polyfill.min.js'
      }
    ])
  ]),
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
