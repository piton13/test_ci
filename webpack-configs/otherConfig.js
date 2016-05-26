const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require('webpack');

const scssLoaders = [
    'css',
    'sass'
];

module.exports = {
    //context: './src',
    entry: './src/app',
    output: {
        path: './build',
        publicPath: '/build',
        filename: 'bundle.js'
    },
    // resolve modules
    resolve: {
        modulesDirectories: ['node_modules'],
        extentions: ['', '.js']
    },
    // resolve loaders
    resolveLoader: {
        modulesDirectories: ['node_modules'],
        moduleTemplates: ['*-loader', '*'],
        extensions: ['', '.js']
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
            }/*,
            {
                test: /\.(jpg|png|svg|ttf|eot|woff|woff2)$/,
                loader: 'file',
                query: {
                    name: '[path][name].[ext]'
                }
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('style-loader', scssLoaders.join('!'))
            }*/
        ]
    },
    devtool: 'source-map',
    watch: true,
    plugins: [
        new webpack.NoErrorsPlugin()
        //new ExtractTextPlugin("bundle.css")
    ]
};