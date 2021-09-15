const HtmlWebpackPlugin = require("html-webpack-plugin");
const chalk = require("chalk");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
// CSS 文件分离
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { resolveApp } = require("./paths");

const isEnvDevelopment = process.env.NODE_ENV === "development";
const isEnvProduction = process.env.NODE_ENV === "production";

const lessRule = [
  // 将 JS 字符串生成为 style 节点
  "style-loader",
  // 将 CSS 转化成 CommonJS 模块
  {
    loader: "css-loader",
    options: {
      // Enable CSS Modules features
      modules: true,
      importLoaders: 2,
    },
  },
  // postcss-preset-env 包含 autoprefixer
  "postcss-loader",
  // 将 less 编译成 CSS
  {
    loader: "less-loader",
    options: {
      lessOptions: {
        javascriptEnabled: true,
      },
    },
  },
];
if (isEnvProduction) {
  lessRule.splice(1, 0, MiniCssExtractPlugin.loader);
}

module.exports = {
  // 简化模块引入
  resolve: {
    extensions: [".jsx", ".js"], // 因为我的项目只有这两种类型的文件，如果有其他类型，需要添加进去。
    alias: {
      "@": resolveApp("src"), // @ 代表 src 路径
    },
    modules: ["node_modules", resolveApp("src")],
  },
  cache: {
    type: "filesystem", // 使用文件缓存
  },
  plugins: [
    // 生成html，自动引入所有bundle
    new HtmlWebpackPlugin({
      title: "janko",
      template: resolveApp("public/index.html"),
    }),
    // 进度条
    new ProgressBarPlugin({
      format: `  :msg [:bar] ${chalk.green.bold(":percent")} (:elapsed s)`,
    }),
    new MiniCssExtractPlugin({
      filename: isEnvProduction ? "[hash].[name].css" : "[name].css",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js|jsx$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        include: [resolveApp("src")],
        type: "asset/resource",
      },
      {
        test: /.(woff|woff2|eot|ttf|otf)$/i,
        include: [resolveApp("src")],
        type: "asset/resource",
      },
      // 处理 node_modules 里面的less文件
      {
        test: /\.less$/,
        include: /node_modules/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "less-loader",
            options: {
              lessOptions: {
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
      // 处理 其他文件夹 里面的less文件（使用css module）
      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: lessRule,
      },
    ],
  },
};
