var path = require('path')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')
var vuxLoader = require('vux-loader');
var HappyPack = require('happypack');
var os = require('os')
// 构造出共享进程池，进程池中包含5个子进程
var happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

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
      'vue'  : 'vue/dist/vue.js'
    },
    modules: [resolve('node_modules')]
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      // {
      //   test: /\.vue$/,
      //   use: ['happypack/loader?id=vue']
      // },
      {
        test: /\.js$/,
        use: ['happypack/loader?id=babel'],
        include: [resolve('src')]
      }
    ]
  },

  plugins: [
    // new HappyPack({
    //   id: 'vue',
    //   loaders: [{
    //     loader: 'vue-loader',
    //     options: vueLoaderConfig
    //   }],
    //   threadPool: happyThreadPool
    // }),
    new HappyPack({
      id: 'babel',
      loaders: ['babel-loader?cacheDirectory=true'],
      threadPool: happyThreadPool
    })
  ],
  externals: {
    // 'vue': 'Vue',
    // 'vue-router': 'VueRouter',
    // 'vuex': 'Vuex',
    // 'axios': 'axios'
  }
}

module.exports = vuxLoader.merge(webpackConfig, {
  options: {},
  plugins: [{
    name: 'vux-ui'
  }]
});
