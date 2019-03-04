const path = require('path')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  mode:'production',
  entry: {
    background: path.join(__dirname, './src/background'),
    content: path.join(__dirname, './src/content'),
    entry: path.join(__dirname, './src/entry'),
    options: path.join(__dirname, './src/options'),
  },
  output: {
    path: path.join(__dirname, './dist'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: 'src/manifest.json' },
      { from: 'src/content.css' },
      { from: 'src/options.html' },
      { from: 'src/assets/**/*', flatten: true }
    ]),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    })
  ],
  resolve: {
    extensions: ['.js']
  },
  watchOptions: {
    ignored: /(node_modules|dist)/
  }
}
