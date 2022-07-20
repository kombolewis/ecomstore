const {merge} = require('webpack-merge')
const commonConfig = require('./webpack.common')
const Dotenv = require('dotenv-webpack');
const path = require('path')

const devConfig = {
    mode: 'development',
    plugins: [
        new Dotenv({
            path: path.resolve(__dirname, './../.env'),
        })
    ]
}

module.exports = merge(commonConfig, devConfig)