var path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env) => {
  const isDevBuild = !(env && env.production);

  return {
    devtool: 'inline-source-map',
    entry: {
      'main': ['./ClientApp/boot-client.js', './ClientApp/index.scss'],
      'main-server': ['./ClientApp/boot-server.js']
    },
    output: {
      path: path.join(__dirname, './wwwroot/dist'),
      publicPath: '/dist/',
      filename: isDevBuild ? "[name].js" : "[name].min.js",
      libraryTarget: 'commonjs'
    },
    resolve: {
      extensions: [".jsx", ".js"],
    },
    plugins: [
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: "[name].css",
        chunkFilename: "[id].css"
      })
    ],
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
          use: isDevBuild ? [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'sass-loader',
          ] :
            [
              MiniCssExtractPlugin.loader,
              'sass-loader',
              'css-loader'
            ]
        }
      ]
    },
    target: 'node',
    mode: isDevBuild ? 'development' : 'production'
  }
};