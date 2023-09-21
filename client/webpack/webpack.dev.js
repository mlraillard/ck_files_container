const webpack = require('webpack');
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

module.exports = {
    mode: "development",
    devServer: {
      hot: true,
      open: true,
      port: 8001,
    },
    devtool: "cheap-module-source-map",
    plugins: [
        new ReactRefreshWebpackPlugin(),
        new webpack.DefinePlugin({
          'process.env.name': JSON.stringify('Test'),
          'process.env.mode': JSON.stringify('dark'),
        }),
      ],
}