const path = require('path');

const config = {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, 'src'),
          path.resolve(__dirname, 'common'),
        ],
        use: 'babel-loader',
      },
    ],
  },
};

module.exports = config;
