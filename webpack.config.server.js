const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const StartServerPlugin = require('start-server-webpack-plugin');
const ReloadServerPlugin = require('reload-server-webpack-plugin');

module.exports = {
  entry: [ 'webpack/hot/poll?1000', './server/index' ],
  watch: true,
  target: 'node',
  externals: [ nodeExternals({ whitelist: [ 'webpack/hot/poll?1000' ] }) ],
  module: {
    rules: [
      { test: /\.js?$/, use: 'babel-loader', exclude: /node_modules/ },
    ],
  },
  plugins: [
    new StartServerPlugin('server.js'),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': { BUILD_TARGET: JSON.stringify('server') },
    }),
    new ReloadServerPlugin({
      // Defaults to process.cwd() + "/server.js"
      script: './server/index.js',
    }),
  ],
  output: { path: path.join(__dirname, '.build'), filename: 'server.js' },
};
