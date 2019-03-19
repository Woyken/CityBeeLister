var path = require('path');
var webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  // The entry point for the bundle.
  entry: {
    'client': './src/app.ts'
  },
  // Options affecting the output of the compilation.
  output: {
    // The output directory as an absolute path (required).
    path: path.resolve(__dirname, '../dist'),
    // The publicPath specifies the public URL address of the output files when referenced in a browser.
    publicPath: '',
    // Specifies the name of each output file on disk.
    filename: 'app.js'
  },
  // Options affecting the normal modules.
  module: {
    // An array of Rules which are matched to requests when modules are created.
    rules: [{
        test: /\.(vue|sass)$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
            // the "scss" and "sass" values for the lang attribute to the right configs here.
            // other preprocessors should work out of the box, no loader config like this necessary.
            'scss': 'vue-style-loader!css-loader!sass-loader',
            'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax',
          }
          // Other vue-loader options here.
        }
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          appendTsSuffixTo: [/\.vue$/],
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        },
      },

      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Le site',
      filename: 'index.html',
      template: 'index.html',
      inject: true
    })
  ],
  // Options affecting the resolving of modules.
  resolve: {
    // An array of extensions that should be used to resolve modules.
    extensions: ['.ts', '.js', '.vue', '.json'],
    // Replace modules with other modules or paths.
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  // Can be used to configure the behaviour of webpack-dev-server when the webpack config is passed to webpack-dev-server CLI.
  devServer: {
    // Access dev server from arbitrary url.
    historyApiFallback: true,
    // With noInfo enabled, messages like the webpack bundle information that is shown when starting up and after each save, will be hidden. Errors and warnings will still be shown.
    noInfo: true
  },
  // These options allows you to control how webpack notifies you of assets and entrypoints that exceed a specific file limit.
  performance: {
    // Turns hints on/off. In addition, tells webpack to throw either an error or a warning when hints are found.
    hints: false
  },
  // Choose a developer tool to enhance debugging.
  devtool: '#eval-source-map',

}
