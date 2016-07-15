// Karma configuration
// Generated on Thu Jul 14 2016 23:27:37 GMT-0700 (PDT)

module.exports = function (config) {
    config.set({
        browsers: ['PhantomJS'],
        singleRun: true,
        frameworks: ['mocha', 'sinon-chai', 'chai'],
        files: [
            'test.config.js'
        ],
        preprocessors: {
            'test.config.js': ['webpack', 'sourcemap']
        },
        reporters: ['progress'],
        webpack: {
            devtool: 'eval',
            module: {
                loaders: [{
                    test: /\.js?$/,
                    exclude: /node_modules/,
                    loader: "babel",
                    query: {
                        presets: ['es2015']
                    }
                }]
            }
        },
        webpackServer: {
            noInfo: true
        }
    });
};
