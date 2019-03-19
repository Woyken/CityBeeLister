const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const webpack = require('webpack');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = merge(common, {
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
            }
          ]
    },
    plugins: [
		new ExtractTextPlugin('style.css'),
		new webpack.DefinePlugin({
			'process.env': {
			  NODE_ENV: '"production"'
			}
		}),
		new webpack.LoaderOptionsPlugin({
			minimize: true
		}),
		new OptimizeCSSPlugin({
			cssProcessorOptions: {
			  	safe: true
			}
	  	}),
	],
	optimization: {
		minimizer: [
			new UglifyJsPlugin({
				uglifyOptions: {
					warnings: false
				},
				sourceMap: true
			}),
		]
	}
})
