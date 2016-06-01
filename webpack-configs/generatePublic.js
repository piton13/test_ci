const webpack = require('webpack');

const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const scssLoaders = [
    'css',
    'resolve-url',
    'sass'
];

module.exports = {
    context: path.join(__dirname, '/src'),
    entry: './app',
    output: {
        path: path.join(__dirname, '/build'),
        publicPath: 'http://localhost:8080/build/',
        filename: 'bundle.js'
    },
    // resolve modules
    resolve: {
        extentions: ['', '.js', '.scss']
    },
    // resolve loaders
    resolveLoader: {
        root: path.join(__dirname, '/node_modules')
    },
    module: {
        loaders: [
            {
                test: /\.es6$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('style', scssLoaders.join('!'))
            },
            {
                test: /\.(jpg|png|svg|ttf|eot|woff|woff2)$/,
                loader: 'file',
                query: {
                    name: '[path][name].[ext]'
                }
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('bundle.css')
    ],
    devtool: 'source-map'/*,
     watch: true*/
};