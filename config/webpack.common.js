const HtmlWebpackPlugin = require("html-webpack-plugin");
const chalk = require("chalk");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
// CSS 文件分离
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { resolveApp } = require("./paths");

const isEnvDevelopment = process.env.NODE_ENV === "development";
const isEnvProduction = process.env.NODE_ENV === "production";

module.exports = {
  // 简化模块引入
  resolve: {
    extensions: [".jsx", ".js"], // 因为我的项目只有这两种类型的文件，如果有其他类型，需要添加进去。
    alias: {
      "@": resolveApp("src"), // @ 代表 src 路径
    },
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
      filename: isEnvProduction ? "[name].[contenthash].css" : "[name].css",
      chunkFilename: isEnvProduction ? "[id].[contenthash].css" : "[id].css",
    }),
  ],
  module: {
    // babel-loader 使用 Babel 加载 ES2015+ 代码并将其转换为 ES5
    // @babel/core Babel 编译的核心包
    // @babel/preset-env Babel 编译的预设/规则，可以理解为 Babel 插件的超集
    rules: [
      {
        test: /\.js|jsx$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(png|svg|jpe?g|gif)$/i,
        include: [resolveApp("src")],
        type: "asset",
        generator: {
          // 输出文件位置以及文件名
          // [ext] 自带 "." 这个与 url-loader 配置不同
          filename: "[name][hash:8][ext]"
        },
        parser: {
          dataUrlCondition: {
            maxSize: 50 * 1024 //超过50kb不转 base64
          }
        }
      },
      {
        test: /.(woff2?|eot|ttf|otf)$/i,
        include: [resolveApp("src")],
        type: "asset",
        generator: {
          // 输出文件位置以及文件名
          filename: "[name][hash:8][ext]"
        },
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024 // 超过100kb不转 base64
          }
        }
      },
      // 处理 node_modules 里面的less文件
      {
        test: /\.less$/,
        include: /node_modules/,
        use: [
          isEnvProduction ? MiniCssExtractPlugin.loader : "style-loader",
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
        include: resolveApp("src"),
        use: [
          // style-loader将 JS 字符串生成为 style 节点
          // 推荐 production 环境的构建将 CSS 从你的 bundle 中分离出来，这样可以使用 CSS/JS 文件的并行加载。 这可以通过使用 mini-css-extract-plugin 来实现，因为它可以创建单独的 CSS 文件。 
          // 对于 development 模式（包括 webpack-dev-server），你可以使用 style-loader，因为它可以使用多个 标签将 CSS 插入到 DOM 中，并且反应会更快。
          isEnvProduction ? MiniCssExtractPlugin.loader : "style-loader",
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
        ],
      },
    ],
  },
};
