const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const CopyWebpackPlugin = require("copy-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const PurgecssPlugin = require('purgecss-webpack-plugin');
const glob = require('glob');

const path = require("path");
module.exports = {
  mode: "production",
  output: {
    filename: "script/[name].js",
    path: path.join(__dirname, "../dist"),
    clean: true,
  },
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
