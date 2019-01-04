const path = require("path");

const HtmlWebPackPlugin = require("html-webpack-plugin");

const htmlPlugin = new HtmlWebPackPlugin({
  template: "./client/public/index.html",
  filename: "./index.html"
});

module.exports = {
  entry: "./client/src/index.js",
  output: {
    path: path.resolve(__dirname, "client/build"),
    filename: "build.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: true
            }
          }
        ]
      }
    ]
  },
  plugins: [htmlPlugin]
};
