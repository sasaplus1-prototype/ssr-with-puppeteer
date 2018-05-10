const webpack = require('webpack');

module.exports = function(env) {
  return [
    {
      context: __dirname,
      entry: {
        'index': `${__dirname}/src/index.js`,
      },
      mode: 'none',
      module: {
        rules: [
          {
            exclude: /node_modules/,
            test: /\.js$/,
            use: [
              { loader: 'babel-loader' },
            ],
          },
        ],
      },
      output: {
        filename: '[name].js',
        path: `${__dirname}/public/`,
        publicPath: './',
      },
      plugins: [
        new webpack.NoEmitOnErrorsPlugin,
      ],
      target: 'web',
    },
  ];
};
