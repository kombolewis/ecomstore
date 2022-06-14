import { Configuration } from "webpack";
import {resolve} from 'path';

const config: Configuration = {
  entry: './src/launcher.ts',
  mode: 'development',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        use: 'ts-loader',
        exclude: /node-modules/
      }
    ]
  },
  resolve: {
    extensions: ['.tsx','.ts','.js']
  },
  output: {
    filename: 'app.js',
    path: resolve(__dirname, './../dist')

  }
}

export default config


