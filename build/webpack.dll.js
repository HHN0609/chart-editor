const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'production',
  entry: {
    library: ['vue', 'vue-router'],
  },
  output: {
    filename: 'vue-library.dll.js',
    path: path.resolve(__dirname, '../dll'),
    library: '[name]_[hash]', // 对应的包映射名
  },
  plugins: [
    new webpack.DllPlugin({
      context: __dirname,
      name: '[name]_[hash]', // 引用的包映射名
      path: path.join(__dirname, '../dll/vue-library.json'),
    }),
  ],
};