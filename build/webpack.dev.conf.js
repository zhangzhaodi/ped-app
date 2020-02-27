'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)
//将等号前边的内容置换成空字符串,即‘env.name=’去掉
var im = process.argv[process.argv.length - 1].replace(/^(\S)*=/, '');
//将modules里边的im过滤出来
const List  = require('./module-conf').moduleList || [];
let moduleList = [];
List.forEach((item,index)=>{
  if(im == item){
      moduleList[0] = item;
  }
});
//zack：验证是否输入操作包，或者包名是否正确
//注意：只支持单个包输入，没有做精细判断
if(moduleList.length == 0){
  console.log('==========请输入操作包，并保证操作包正确，否则会报错===========');
  throw Error('未输入操作包，或者输入包名错误，请检查');
}


//组装出来插件
//const moduleList = require('./module-conf').moduleList || []
// 组装多个（有几个module就有几个htmlWebpackPlugin）htmlWebpackPlugin，然后追加到配置中
//zack：现在是一个
const htmlWebpackPlugins = []
for (let module of moduleList) {
  htmlWebpackPlugins.push(new HtmlWebpackPlugin({
    filename: `${module}/index.html`,
    template: `./src/modules/${module}/index.html`,
    inject: true,
    chunks: [module]
  }))
}
const devWebpackConfig = merge(baseWebpackConfig, {
  //zack:dev的单独放在dev里边，这样就可以和build的区分开，单独运行一个
  entry() {
    // 初始化入口配置
    const entry = {}
    var im = process.argv[process.argv.length - 1].replace(/^(\S)*=/, '');
    console.log('=======',im);
    
    //将modules里边的im过滤出来
    const List  = require('./module-conf').moduleList || [];
    let moduleToBuild = [];
    List.forEach((item,index)=>{
      if(im == item){
        moduleToBuild[0] = item;
      }
    });
    // 根据传入的待打包目录名称，构建入口配置
    for (let module of moduleToBuild) {
      entry[module] = `./src/modules/${module}/index.js`
    }
    return entry
  },
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,
  // these devServer options should be customized in /config/index.js
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
      ],
    },
    hot: true,
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll,
    },
    before(app) {
      // // 写个小路由，打开浏览器的时候可以选一个开发路径
      // // let html = `<html><head><title>调试页面</title>`
      // // html += `<style>body{margin: 0}.module-menu{float: left;width: 200px;height: 100%;padding: 0 8px;border-right: 1px solid #00ffff;box-sizing: border-box}.module-container{float: left;width: calc(100% - 200px);height: 100%}.module-container iframe{width: 100%;height: 100%}</style>`
      // // html += `</head><body><div class="module-menu">`
      // // for(let module of moduleList){
      // //   html += `<a href="/${module}/index.html" target="container">${module.toString()}</a><br>`
      // // }
      // // html += `<p>将这一栏里面的链接拷贝出来直接访问，也可调式，而且可能会比当前方式更方便。</p>`
      // // html += `</div>`
      // // html += `<div class="module-container"><iframe src="/${moduleList[0]}/index.html" name="container" frameborder="0"></iframe></div>`
      // // html += `</body></html>`
      // // // let sentHref = ''
      // // // for(var module in moduleList){
      // // //   sentHref += '<a href="/'+ moduleList[module] +'/index.html">点我调试模块：'+ moduleList[module].toString() +'</a> <br>'
      // // // }
      // app.get('/moduleList', (req, res, next) => {
      //   res.send(html)
      // })
      // 访问根路径时重定向到moduleList
      app.get('/', (req, res, next) => {
        res.redirect('/myAccount')
      })
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*']
      }
    ]),
    // https://github.com/ampedandwired/html-webpack-plugin
    // new HtmlWebpackPlugin({
    //   filename: 'a/index.html',
    //   template: './src/modules/a/index.html',
    //   inject: true,
    //   chunks: ['a']
    // }),
  ].concat(htmlWebpackPlugins)
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
          ? utils.createNotifierCallback()
          : undefined
      }))
      resolve(devWebpackConfig)
    }
  })
})
