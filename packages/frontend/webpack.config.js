const path = require("path");
const webpack = require("webpack");
const Dotenv = require("dotenv-webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const basePlugins = [
  new MiniCssExtractPlugin({
    filename: "[name].css",
    chunkFilename: "[id].css",
    ignoreOrder: false
  }),
];

module.exports = function(env) {
  let plugins;
  let minimizer;
  if (env && env === "prod") {
    plugins = [
      ...basePlugins,
      new Dotenv({
        path: path.resolve(__dirname, "../../.env.prod"),
        systemvars: true,
      }),
    ];
    minimizer = [
      new TerserPlugin(),
    ];
  } else {
    plugins = [
      ...basePlugins,
      new Dotenv({
        path: path.resolve(__dirname, "../../.env"),
        systemvars: false,
      }),
    ];
    minimizer = [];
  }
  return {
    entry: {
      main: path.resolve(__dirname, "src/index.ts"),
      auth: path.resolve(__dirname, "src/auth.ts"),
    },
    output: {
      path: path.resolve(__dirname, "public"),
      filename: "[name].js",
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js"],
    },
    module: {
      rules: [
        { test: /\.tsx?$/, exclude: /node_modules/, loader: "ts-loader", options: { transpileOnly: true } },
        {
          test: /\.css$/,
          use: [
            { loader: MiniCssExtractPlugin.loader },
            {
              loader: "css-loader",
              options: {
                modules: {
                  localIdentName: env !== "prod" ? "[name]_[local]" : "[hash:base64]",
                },
              },
            },
            { loader: "postcss-loader" },
          ]
        },
      ],
    },
    plugins,
    optimization: {
      minimizer,
    },
    devServer: {
      port: 4000,
      contentBase: path.join(__dirname, "public"),
    },
    devtool: "source-map",
  };
};
