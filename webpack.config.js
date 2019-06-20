const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: "development",
  entry: "./src/front-end/App.jsx",
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env", "@babel/preset-react"]
        }
      },
      {
        test: /\.s?css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          "css-loader",
          "sass-loader"
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style.css',
      chunkFilename: '[id].css',
    }),
  ],
  resolve: {
    extensions: [".js", ".json", ".jsx", ".css"],
  },
  devtool: "source-map",
  target: "web",
  devServer: {
    // contentBase: path.join(__dirname, 'public'),
    publicPath: '/public/',
    compress: true,
    port: 9000,
    historyApiFallback: true,
  }
}