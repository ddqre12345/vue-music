var path = require('path')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')
var vuxLoader = require('vux-loader')
var HappyPack = require('happypack')
// 构造出共享进程池，进程池中包含5个子进程
var happyThreadPool = HappyPack.ThreadPool({ size: 5 })

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

const webpackConfig = {
  entry: {
    app: './src/main.js'
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': resolve('src'),
      'vue'  : 'vue/dist/vue.min'
    },
    modules: [resolve('node_modules')]
  },
  module: {
    rules: [
      // {
      //   test: /\.vue$/,
      //   loader: 'vue-loader',
      //   options: {
      //       loaders: {
      //           scss: [
      //               'style-loader',
      //               'css-loader'
      //           ]
      //       }
      //   }
      // },
      {
        test: /\.vue$/,
        use: ['happypack/loader?id=vue']
      },
      {
        test: /\.js$/,
        use: ['happypack/loader?id=babel'],
        include: [resolve('src')]
      }
    ]
  },

  plugins: [
    new HappyPack({
      id: 'vue',
      loaders: [{
        loader: 'vue-loader',
        options: vueLoaderConfig
      }],
      threadPool: happyThreadPool
    }),
    new HappyPack({
      id: 'babel',
      loaders: ['babel-loader'],
      threadPool: happyThreadPool
    })
  ]
}

module.exports = vuxLoader.merge(webpackConfig, {
  plugins: ['vux-ui']
});
