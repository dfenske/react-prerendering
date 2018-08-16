var path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = (env) => {
  const isDevBuild = !(env && env.production);

  return {
    devtool: 'inline-source-map',
    entry: {
      'main': ['./ClientApp/boot-client.js'],
      'main-server': ['./ClientApp/boot-server.js']
    },
    output: {
      path: path.join(__dirname, './ClientApp/dist'),
      publicPath: '/dist/',
      filename: isDevBuild ? "[name].js" : "[name].min.js",
      libraryTarget: 'commonjs'
    },
    resolve: {
      extensions: [".jsx", ".js"],
    },
    module: {
      rules: [
        {
          // JavaScript files, which will be transpiled
          // based on .babelrc
          test: /\.(js|jsx)$/,
          exclude: [/node_modules/],
          use: [{
            loader: 'babel-loader',
            options: {
              cacheDirectory: './build/.babelCache',
            }
          }] // convert JSX, es6
        },
        {
          test: /\.(js|jsx)$/,
          use: ['source-map-loader'],
          enforce: 'pre',
          exclude: /node_modules/
        },
        {
          test: /\.s?css$/,
          use: isDevBuild
            ? ['style-loader', 'css-loader', 'sass-loader']
            : ExtractTextPlugin.extract({ use: ['css-loader', 'sass-loader'] })
        }
      ]
    },
    target: 'node',
    mode: isDevBuild ? 'development' : 'production'
  }
};