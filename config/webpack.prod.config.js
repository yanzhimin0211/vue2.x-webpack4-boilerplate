'use strict'
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
// css 文件提取，仅支持webpack4
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  mode: 'production',
  devtool: 'sourceMap',
  entry: {
    app: './src/main.js',
  },
  output: {
    path: path.resolve(__dirname, '../dist'), // 打包文件输出目录
    filename: '[name].[chunkhash].js', // 打包后的文件名
    chunkFilename: '[name].[chunkhash].js'
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
        use: {
          loader: 'babel-loader',
          // options: {
          //   presets: ['@babel/preset-env'],
          //   plugins: ['@babel/plugin-transform-runtime']
          // }
        },
        include: [path.resolve('src')],
      },
      // css, scss, sass文件loader解析, postcss解析处理 https://www.npmjs.com/package/postcss-loader
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          // devMode ? 'style-loader' : MiniCssExtractPlugin.loader, // TODO
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          },
          'sass-loader',
        ],
      },
      // 图片文件loader解析
      {
        test: /\.(png|jpg|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 1,
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

    new webpack.DefinePlugin({
      'process.env': 'production'
    }),

    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          warnings: false
        }
      },
      sourceMap: true,
      parallel: true
    }),

    new MiniCssExtractPlugin({
      filename: '[name].[chunkhash].css',
      chunkFilename: '[name].[chunkhash].css',
    }),
    // 在dist目录下生成index.html文件，并且将entry里面注册的js文件名都注入到html里面
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: 'body',
    }),

    new webpack.HashedModuleIdsPlugin(),

    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true,
        map: {
          inline: false
        }
      }
    }),
  ],

};
