/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
// const ESLintPlugin = require("eslint-webpack-plugin");
module.exports = {
  mode: "development",
  target: "web",
  devtool: "source-map",
  devServer: {
    hot: true,
    open: true,
  },
  module: {
    rules: [
      {
        test: /\.(le|c)ss$/,
        use: ["style-loader", "css-loader", "postcss-loader", "less-loader"],
      },
    ],
  },
  // plugins: [new ESLintPlugin({ extensions: ["js", "ts", "vue"] })],
};
