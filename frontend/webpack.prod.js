const {merge} = require('webpack-merge')
const commonConfig = require('./webpack.common')
const Dotenv = require('dotenv-webpack');
const path = require('path')

const prodConfig = {
    mode: 'production',
    plugins: [
        new Dotenv({
            path: path.resolve(__dirname, './../prod.env'),
        })
    ]
}

module.exports = merge(commonConfig, prodConfig)