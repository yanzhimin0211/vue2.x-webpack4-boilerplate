'use strict'
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
// css 文件提取，仅支持webpack4
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin')

// 热跟新必须有以下5点：
// 1.引入webpack
// 2.output里加publicPath
// 3.devServer中增加hot:true
// 4.devServer中增加hotOnly:true
// 5.在plugins中配置 new webpack.HotModuleReplacementPlugin()
module.exports = {
  mode: 'development',
  watch: true,
  devServer: {
    contentBase: false,
    host: '0.0.0.0',
    overlay: true,
    port: 9000,
    historyApiFallback: true,
    compress: true,
    inline: true,
    open: true,
    openPage: '',
    clientLogLevel: 'none',
    watchOptions: {
      poll: true
    },
    publicPath: '/',
    proxy: [{
      context: [],
      changeOrigin: true,
      secure: false
    }],
    hot: true,
    // 输出的日志信息
    stats: {
      // 添加 public path 的信息
      publicPath: true,
      // 添加构建模块信息, 这个日志非常多，关掉
      modules: false,
      // 添加 children 信息, 非常多
      children: false,
      // 添加警告
      warnings: true
    }
  },
  // devtool: 'sourceMap',
  entry: {
    app: './src/main.js',
  },
  output: {
    path: path.resolve(__dirname, '..', 'dist'),
    filename: '[name].js',
    publicPath: '/',
    // chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
    chunkFilename: '[name].js',
  },
  module: {
    rules: [
      // vue 文件解析
      {
        test: /\.vue$/,
        use: 'vue-loader',
      },
      // JS文件loader解析: https://www.npmjs.com/package/babel-loader
      {
        test: /\.js$/,
        use: 'babel-loader',
        include: [path.resolve('src')],
      },
      // css, scss, sass文件loader解析, postcss解析处理 https://www.npmjs.com/package/postcss-loader
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          'postcss-loader',
          'sass-loader',
        ],
      },
      // 图片文件loader解析
      {
        test: /\.(png|jpg|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'image/[name].[hash:7].[ext]'
        }
      },
      // icon 解析
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'fonts/[name].[hash:7].[ext]'
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': path.resolve('src'),
    }
  },
  optimization: {
    // splitChunks: {
    //     cacheGroups: {
    //         commons: {
    //             name: "commons",
    //             chunks: "initial",
    //             minChunks: 2
    //         }
    //     }
    // }
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    },
    runtimeChunk: {
      name: entrypoint => `runtimechunk~${entrypoint.name}`
    }
  },
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[name].css',
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),

    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: 'body',
    }),
  ],

};
