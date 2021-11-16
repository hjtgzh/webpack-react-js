/*
 * @文件描述: webpack生产模式
 * @公司: cloudwise
 * @作者: janko
 * @Date: 2021-09-14 15:53:53
 * @LastEditors: janko
 * @LastEditTime: 2021-11-04 09:28:08
 */
const { merge } = require("webpack-merge");
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const common = require("./webpack.common");
const { resolveApp } = require("./paths");

module.exports = merge(common, {
  // 生产模式
  mode: "production",
  devtool: false,
  // 输出
  output: {
    // bundle 文件名称 【只有这里和开发环境不一样】
    filename: "[name].[contenthash].bundle.js",
    // bundle 文件路径
    path: resolveApp("dist"),
    // 编译前清除目录
    clean: true,
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: 4,
        terserOptions: {
          parse: {
            ecma: 8,
          },
          compress: {
            ecma: 5,
            warnings: false,
            comparisons: false,
            inline: 2,
          },
          mangle: {
            safari10: true,
          },
          output: {
            ecma: 5,
            comments: false,
            ascii_only: true,
          },
        },
      }),
      new CssMinimizerPlugin({
        parallel: 4,
      }),
    ],
    splitChunks: {
      // include all types of chunks
      chunks: "all",
      // 重复打包问题
      cacheGroups: {
        vendors: {
          // node_modules里的代码
          test: /[\\/]node_modules[\\/]/,
          chunks: "all",
          // name: 'vendors', 一定不要定义固定的name
          priority: 10, // 优先级
          enforce: true,
        },
      },
    },
  },
  plugins: [new CleanWebpackPlugin()],
});
