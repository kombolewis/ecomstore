const path = require('path')
 
const config = {
    entry: './src/launcher.js',
    module: {
        rules: [
        {
            test: /\.js$/,
            use: {
            loader: 'babel-loader'
            },
            exclude: /(node-modules)/
        }
        ]
    },
    resolve: {
        extensions: ['.tsx','.ts','.js'],
        alias: {
        '@':path.resolve(__dirname, 'src'),
        config: path.resolve(__dirname, 'src/config'),
        framework: path.resolve(__dirname, 'src/framework'),
        listeners: path.resolve(__dirname, 'src/listeners')
        }
    },
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, './../dist')
    },
}
module.exports = config


