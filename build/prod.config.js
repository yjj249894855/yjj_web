const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const merge = require('webpack-merge');
const webpackBaseConfig = require('./base.config.js');
const fs = require('fs');
const path = require('path');
const env  = process.env.NODE_ENV||'pro';

fs.open('./src/config/env.js', 'w', function(err, fd) {
    const buf = `export default "${env}";`;
    fs.write(fd, buf, 0, buf.length, 0, function(err, written, buffer) {});
});

let plugins = [
    new ExtractTextPlugin({
        filename: `[name].css?${env}[hash:8]`,
        allChunks: true
    }),
    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendors',
        filename: `vendors.js?${env}[hash:8]`
    }),
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    }),
    new HtmlWebpackPlugin({
        favicon: './favicon.ico',
        filename: '../dist/index.html',
        template: './src/template/index.ejs',
        inject: false
    })
];
if(env=='pro'){
    plugins.push(new webpack.DefinePlugin({
        'process.env':{
            NODE_ENV:'"production"'
        }
    }));
}
module.exports = merge(webpackBaseConfig, {
    output: {
        publicPath: '/',
        filename: `[name].js?${env}[hash:8]`,
        chunkFilename: '[name].chunk.js?[hash:8]'
    },
    plugins: plugins
});