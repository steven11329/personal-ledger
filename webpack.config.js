const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  mode: "development",
  entry: "./src/front-end/App.jsx",
  output: {
    path: path.resolve(__dirname, "docs"),
    filename: "bundle.js",
    chunkFilename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        options: {
          presets: [
            "@babel/preset-env",
            "@babel/preset-react"
          ],
          plugins: [
            "@babel/plugin-syntax-dynamic-import"
          ]
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
    new HtmlWebpackPlugin({
      template: 'src/front-end/index.html',
      // filename: path.resolve(__dirname,'index.html')
    }),
    // new BundleAnalyzerPlugin()
  ],
  resolve: {
    modules: [
      "node_modules",
    ],
    extensions: [".js", ".json", ".jsx", ".css"],
  },
  // devtool: "source-map",
  target: "web",
  devServer: {
    contentBase: [path.join(__dirname, 'docs'), path.join(__dirname)],
    compress: true,
    port: 9000,
    historyApiFallback: true,
  }
}