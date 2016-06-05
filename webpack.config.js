//const asdf = require('./webpack-configs/myConfig');
//const asdf = require('./webpack-configs/otherConfig');
//const asdf = require('./webpack-configs/hotReplacementConfig');
//const asdf = require('./webpack-configs/generatePublic');

const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const scssLoaders = [
    'css',
    'resolve-url',
    'sass'
];

const SpritesmithPlugin = require('webpack-spritesmith');

const asdf = {
    context: path.join(__dirname, '/src'),
    entry: './app',
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
        new ExtractTextPlugin('bundle.css'),
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
        })
    ],
    devtool: 'source-map',
    watch: true
};

module.exports = asdf;