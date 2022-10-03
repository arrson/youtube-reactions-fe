const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const ROOT = path.resolve(__dirname);

module.exports = (env) => {
  const isDevelopment = !env.production;

  const options = {
    mode: isDevelopment ? 'development' : 'production',
    entry: {
      contentScript: [ROOT + '/src/scripts/contentScript'],
      options: [ROOT + '/src/pages/Options/index'],
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'build'),
      publicPath: '/',
    },
    module: {
      rules: [
        {
          test: [/\.jsx?$/, /\.tsx?$/],
          use: ['babel-loader'],
          exclude: /node_modules/,
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(scss|sass)$/,
          use: ['style-loader', 'css-loader', 'sass-loader'],
        },
        {
          test: /\.(jpe?g|png|gif|svg)$/i,
          use: [
            'file-loader?hash=sha512&digest=hex&name=img/[contenthash].[ext]',
            'image-webpack-loader?bypassOnDebug&optipng.optimizationLevel=7&gifsicle.interlaced=false',
          ],
        },
        {
          test: /\.html$/,
          use: ['html-loader'],
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.css'],
      alias: {
        process: 'process/browser',
      },
    },
    plugins: [
      isDevelopment && new ReactRefreshPlugin(),
      new Dotenv(),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: 'src/manifest.json',
            to: path.join(__dirname, 'build'),
            force: true,
            transform: function (content) {
              // generates the manifest file using the package.json informations
              return Buffer.from(
                JSON.stringify({
                  description: process.env.npm_package_description,
                  version: process.env.npm_package_version,
                  ...JSON.parse(content.toString()),
                })
              );
            },
          },
          {
            from: 'src/assets/img/icon-128.png',
            to: path.join(__dirname, 'build'),
            force: true,
          },
          {
            from: 'src/assets/img/icon-48.png',
            to: path.join(__dirname, 'build'),
            force: true,
          },
        ],
      }),
      new HtmlWebpackPlugin({
        template: path.join(__dirname, 'src', 'pages', 'Options', 'index.html'),
        filename: 'options.html',
        chunks: ['options'],
        cache: false,
      }),
    ].filter(Boolean),
    devServer: {
      devMiddleware: {
        writeToDisk: true,
      },
    },
  };

  if (isDevelopment) {
    options.devtool = 'cheap-module-source-map';
  } else {
    options.optimization = {
      minimize: true,
      minimizer: [new TerserPlugin({ extractComments: false })],
    };
  }

  return options;
};
