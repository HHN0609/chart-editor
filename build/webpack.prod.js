const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const CopyWebpackPlugin = require("copy-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const PurgecssPlugin = require('purgecss-webpack-plugin');
const glob = require('glob');
const webpack = require('webpack');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const CleanEmptyCssFilesPlugin = require("./webpack-plugins/clean-empty-css-files-plugin");

const path = require("path");

const prod = {
  mode: "production",
  output: {
    filename: "script/[name].js",
    path: path.join(__dirname, "../dist"),
    clean: true,
  },
}

const devAsProd = {
  mode: "development",
  target: "web",
  devtool: "eval",
  devServer: {
    host: "127.0.0.1",
    port: 8081,
    hot: true,
    proxy: {
      "/api": "http://127.0.0.1:3000",
    },
  },
}

module.exports = {
  ...prod,
  module: {
    rules: [
      {
        test: /\.(le|c)ss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader", "less-loader"],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].css'
    }),
    new PurgecssPlugin({
      paths: glob.sync(`${path.join(__dirname, '../src')}/**/*`,  { nodir: true }),
    }),
    // new CopyWebpackPlugin({
    //   patterns: [{ from: "./public", to: "./public" }],
    // }),
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('../dll/vue-library.json'),
    }),
    // 打包后的 .dll.js 文件需要引入到 html中，可以通过 add-asset-html-webpack-plugin 插件自动引入
    new AddAssetHtmlPlugin({ 
      filepath: path.resolve(__dirname, '../dll/vue-library.dll.js'),
      publicPath: '',
    }),
    new CleanEmptyCssFilesPlugin(),
  ],
  optimization: {
    minimizer:[
      new CssMinimizerPlugin(),
      new TerserPlugin({
        parallel: true
      })
    ],
  },
 
};
