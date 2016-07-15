//const asdf = require('./webpack-configs/myConfig');
//const asdf = require('./webpack-configs/otherConfig');
//const asdf = require('./webpack-configs/hotReplacementConfig');
//const asdf = require('./webpack-configs/generatePublic');
// TODO Add build file for vendors;
//

const path = require('path');
// const rimraf = require('rimraf');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const scssLoaders = [
    'css',
    'resolve-url',
    'sass'
];

const SpritesmithPlugin = require('webpack-spritesmith');

const asdf = {
    context: path.join(__dirname, '/src'),

    //"start": "webpack-dev-server --hot --inline --content-base build",
    entry: ['webpack-dev-server/client?http://localhost:8080', 'webpack/hot/dev-server', './app'],
    output: {
        path: path.join(__dirname, '/build'),
        publicPath: 'http://localhost:8080/build/',
        filename: 'bundle.js'
    },
    // resolve modules
    resolve: {
        extentions: ['', '.js', '.scss'],
        modulesDirectories: ['node_modules', 'spritesmith-generated']
    },
    // resolve loaders
    resolveLoader: {
        root: path.join(__dirname, '/node_modules')
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
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
                    name: '[path][name].[ext]?[hash]'
                }
            }
        ]
    },
    plugins: [
        // to clean previous build folder
        /*{
            apply: function(compiler) {
                return rimraf.sync(compiler.options.output.path)
            }
        },*/
        new ExtractTextPlugin('bundle.css', {allChunks: true, disable: true}),
        new SpritesmithPlugin({
            src: {
                cwd: path.resolve(__dirname, 'src/sprites'),
                glob: '*.png'
            },
            target: {
                image: path.resolve(__dirname, 'src/spritesmith-generated/sprite.png'),
                css: path.resolve(__dirname, 'src/spritesmith-generated/sprite.scss')
            },
            apiOptions: {
                cssImageRef: "~sprite.png"
            }
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    devtool: 'source-map',
    watch: true,
    devServer: {
        //host: 'localhost', // default
        //port: 8080, // default,
        //contentBase: path.resolve(__dirname, 'build'),
        hot: true
    }
};

module.exports = asdf;
