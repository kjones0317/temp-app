const path = require('path');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const LiveReloadPlugin = require('webpack-livereload-plugin');

module.exports = {
  context: __dirname,
  entry: ['./js/App.jsx', './scss/main.scss'],
  devtool: 'eval',
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js'
  },
  devServer: {
    publicPath: '/public/',
    historyApiFallback: true
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },
  stats: {
    colors: true,
    reasons: true,
    chunks: true
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loaders: ['babel-loader']
      },
      {
        test: /(\.scss|\.css)$/,
        loaders: [
          require.resolve('style-loader'),
          require.resolve('css-loader') +
            '?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
          require.resolve('sass-loader') + '?sourceMap'
        ]
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000'
      }
    ]
  },
  plugins: [
    // new ExtractTextPlugin({
    //   // define where to save the file
    //   filename: '[name].css',
    //   allChunks: true
    // }),
    new LiveReloadPlugin()
  ]
};
