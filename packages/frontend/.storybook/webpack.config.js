const path = require("path");

module.exports = async ({ config, mode }) => {
  config.resolve = {
    extensions: [".ts", ".tsx", ".js"],
  };
  config.module.rules.filter(rule => rule.test.test(".css")).forEach(rule => rule.exclude = path.resolve(__dirname, "../src"));
  config.module.rules = [
    ...config.module.rules,
    {
      test: /\.tsx?$/,
      exclude: /node_modules/,
      use: [
        { loader: "ts-loader", options: { transpileOnly: true } },
      ],
    },
    {
      test: /\.tsx?$/,
      exclude: /node_modules/,
      use: [
        {
          loader: require.resolve("@storybook/addon-storysource/loader"),
          options: { parser: "typescript" },
        },
      ],
      enforce: "pre",
    },
    {
      test: /\.css$/,
      include: path.resolve(__dirname, "../src"),
      use: [
        { loader: "style-loader" },
        {
          loader: "css-loader",
          options: {
            modules: {
              localIdentName: "[name]_[local]",
            },
          },
        },
        { loader: "postcss-loader" },
      ]
    },
  ];

  return config;
};
