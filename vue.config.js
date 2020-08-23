var path = require('path');

function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    publicPath: './',
    runtimeCompiler: false, // 是否使用包含运行时编译器的 Vue 构建版本，尽量配置为false，否则会使得包增加10kb
    //配置开发服务器 (基于 webpack-dev-server) 
    devServer: {
        hot: true,
        // port: 8085,
        proxy: {
          '/': {
            // target:'http://10.170.10.11:18808',
            target:'http://10.101.15.221:18808',
            ws: false, // proxy websockets
            changeOrigin: true  // needed for virtual hosted sites
          }
        }
    },
    configureWebpack: {//webpack配置扩展
        plugins: [

        ]
    },
    chainWebpack: (config) => {//通过链式更高级的配置webpack的内部设置
        config.resolve.alias
            .set('@', resolve('src'))
            .set('AppUtil', resolve('src/utils/AppUtil.js'))
            .set('ArrayUtil', resolve('src/utils/ArrayUtil.js'))
            .set('AxiosUtil', resolve('src/utils/AxiosUtil.js'))
            .set('BrowserUtil', resolve('src/utils/BrowserUtil.js'))
            .set('CacheUtil', resolve('src/utils/CacheUtil.js'))
            .set('DateUtil', resolve('src/utils/DateUtil.js'))
            .set('FunctionUtil', resolve('src/utils/FunctionUtil.js'))
            .set('ParamsUtil', resolve('src/utils/ParamsUtil.js'))
            .set('TreeUtil', resolve('src/utils/TreeUtil.js'))
            .set('UrlUtil', resolve('src/utils/UrlUtil.js'))
            .set('ValidateUtil', resolve('src/utils/ValidateUtil.js'))
    },


}