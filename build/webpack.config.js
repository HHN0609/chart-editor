const { merge } = require("webpack-merge");
const WebpackDev = require("./webpack.dev.js");
const WebpackProd = require("./webpack.prod.js");
const WebpackBase = require("./webpack.base.js");

module.exports = (env) => {
  if (env.development) {
    return merge(WebpackBase, WebpackDev);
  } else if (env.production) {
    return merge(WebpackBase, WebpackProd);
  } else {
    console.error("Error! No such mode!");
    return null;
  }
};
