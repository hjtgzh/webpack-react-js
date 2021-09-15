const webpack = require("webpack");
const { merge } = require("webpack-merge");
// 热更新 react 组件
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const common = require("./webpack.common");
const { resolveApp } = require("./paths");

module.exports = merge(common, {
  // 开发模式
  mode: "development",
  // 开发工具，开启 source map，编译调试
  devtool: "inline-source-map",
  // 输出
  output: {
    // bundle 文件名称
    filename: "[name].bundle.js",
    // bundle 文件路径
    path: resolveApp("dist"),
    // 编译前清除目录
    clean: true,
  },
  devServer: {
    // 告诉服务器从哪里提供内容，只有在你想要提供静态文件时才需要。
    static: {
      directory: resolveApp("dist"),
    },
    port: 9000,
    hot: true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ReactRefreshWebpackPlugin(),
  ],
});
