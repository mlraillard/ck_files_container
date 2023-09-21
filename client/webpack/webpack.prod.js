const webpack = require('webpack');

module.exports = {
    mode: "production",
    devtool: "source-map",
    plugins: [
        //new ReactRefreshWebpackPlugin(),
        new webpack.DefinePlugin({
          'process.env.name': JSON.stringify('Prod'),
          'process.env.mode': JSON.stringify('light'),
        }),
      ],
}