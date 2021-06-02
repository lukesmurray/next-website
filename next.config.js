const webpack = require("webpack");
const withTM = require("next-transpile-modules")(["hast-util-classnames"]); // pass the modules you would like to see transpiled

module.exports = withTM({
  webpack: (config, { isServer }) => {
    // Fixes packages that depend on fs/module module
    if (!isServer) {
      config.node = { fs: "empty", module: "empty" };
    }

    // enable loading image files
    config.module.rules.push({
      test: /\.(svg|png|jpe?g|gif|mp4)$/i,
      use: [
        {
          loader: "file-loader",
          options: {
            publicPath: "/_next",
            name: "static/media/[name].[hash].[ext]",
          },
        },
      ],
    });

    // ignore markdown files
    config.plugins.push(new webpack.IgnorePlugin(/\.mdx?$/));

    return config;
  },
});
