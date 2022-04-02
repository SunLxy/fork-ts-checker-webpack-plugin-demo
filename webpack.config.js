const webpack = require("webpack")
const path = require("path")
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const commonConf = {
  mode: "production",
  context: __dirname,
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        diagnosticOptions: {
          semantic: true,
          syntactic: true,
        },
        mode: "write-references",
      },
    }),
  ],
}

const configArr = [
  {
    ...commonConf,
    entry: path.join(process.cwd(), "src/indexs.ts"),
    output: {
      filename: "indexs.js"
    }
  },
  {
    ...commonConf,
    entry: path.join(process.cwd(), "src/index.ts"),
    output: {
      filename: "index.js"
    }
  },
  {
    ...commonConf,
    entry: path.join(process.cwd(), "src/index2.ts"),
    output: {
      filename: "index2.js"
    }
  }
]

module.exports = configArr
