'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')
// const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {
    'babel-polyfill': 'babel-polyfill',      //ES6语法转换初始没有这个设置
    app: './src/main.js'
  },
  // plugins: [
  //   new MonacoWebpackPlugin()
  // ],
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js'),
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve("src"),
      '@overview' : resolve("src/pages/workstation/overviewPages"),//暂时存在
      //'@nurse' : resolve('src/pages/nursingPlatform/nurse'),
      '@system' : resolve('src/pages/nursingPlatform/system'),
      '@dictionary' : resolve('src/pages/nursingPlatform/dictionaryPages'),
      '@knowledge' : resolve('src/pages/nursingPlatform/knowledgeBase'),
      '@document' : resolve('src/pages/managePlatform/documentAdmin'),
      '@docTemplateAdmin' : resolve('src/pages/managePlatform/documentAdmin/docTemplateAdmin'),
      '@docSubjectAdmin' : resolve('src/pages/managePlatform/documentAdmin/docSubjectAdmin'),
      '@mobileNurse' : resolve('src/pages/nursingPlatform/mobileNursePages'),
      '@inhospital': resolve('src/pages/nursingPlatform/mobileNursePages/inhospital'),
      '@workstation' : resolve('src/pages/workstation'),
      '@managePlatform' : resolve('src/pages/managePlatform'),
      '@adverseEvent' : resolve('src/pages/managePlatform/adverseEvent'),
      '@manage' : resolve('src/pages/managePlatform/adverseEvent/manage'),
      '@count' : resolve('src/pages/managePlatform/adverseEvent/count'),
      '@nurse' : resolve('src/pages/managePlatform/nurse'),
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 600000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}
