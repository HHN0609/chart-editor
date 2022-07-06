module.exports = {
  mode: "development",
  target: "web",
  devtool: "eval",
  devServer: {
    host: "127.0.0.1",
    port: 8081,
    hot: true,
    open: true,
    proxy: {
      "/api": "http://127.0.0.1:3000",
    },
  },
  module: {
    rules: [
      {
        test: /\.(le|c)ss$/,
        use: ["style-loader", "css-loader", "postcss-loader", "less-loader"],
      },
    ],
  },
};
