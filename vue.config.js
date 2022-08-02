const moment = require('moment')
const WebpackBar = require('webpackbar');

const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

// If your port is set to 80,
// use administrator privileges to execute the command line.
// For example, Mac: sudo npm run
// You can change the port by the following method:
// port = 9527 npm run dev OR npm run dev --port = 9527
const port = process.env.port || process.env.npm_config_port || 8080 // dev port

module.exports = {
    // 基本路径 baseURL已经过时
    publicPath: './',  
    // 输出文件目录  build 时构建文件的目录 构建时传入 --no-clean 可关闭该行为
    //outputDir: `dist/${process.env.VUE_APP_OUTPUT_NAME}_${moment().format('YYYYMMDDHHmm')}`,
    outputDir: `dist/`,
    // eslint-loader 是否在保存的时候检查
    lintOnSave: true,
    // 指定生成的 index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径。
    indexPath: 'index.html',
    // 默认在生成的静态资源文件名中包含hash以控制缓存
    filenameHashing: true,
    
    // 构建多页面应用，页面的配置
    // pages: {
    //     index: {
    //         // page 的入口
    //         entry: 'src/index/main.js',
    //         // 模板来源
    //         template: 'public/index.html',
    //         // 在 dist/index.html 的输出
    //         filename: 'index.html',
    //         // 当使用 title 选项时，
    //         // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
    //         title: 'Index Page',
    //         // 在这个页面中包含的块，默认情况下会包含
    //         // 提取出来的通用 chunk 和 vendor chunk。
    //         chunks: ['chunk-vendors', 'chunk-common', 'index']
    //     },
    //     // 当使用只有入口的字符串格式时，
    //     // 模板会被推导为 `public/subpage.html`
    //     // 并且如果找不到的话，就回退到 `public/index.html`。
    //     // 输出文件名会被推导为 `subpage.html`。
    //     subpage: 'src/subpage/main.js'
    // },
    

    lintOnSave:false,//是否开启eslint保存检测 ,它的有效值为 true || false || 'error'
    devServer: {
        open: true, //浏览器自动打开页面
        host: "0.0.0.0", //如果是真机测试，就使用这个IP
        port: port,
        https: false,
        hotOnly: false, //热更新（webpack已实现了，这里false即可）
        // proxy: {
		// 	'/api': {
		// 		changeOrigin: true,
		// 		target: process.env.VUE_APP_BASE_URL,
		// 		pathRewrite: {
		// 			'^/api': ''
		// 		}
        //     },
        //     '/source': {
		// 		changeOrigin: true,
		// 		target: process.env.VUE_APP_BASE_URL,
		// 		pathRewrite: {
		// 			'^/source/source': ''
		// 		}
		// 	}
		// }
    },
    configureWebpack: {
        plugins: [
            //打包进度条
            new WebpackBar({
                name:'加载进度',
                color:'#00FF00'
            })
        ],
        devtool:'#eval-source-map'//'#source-map'
    },
    chainWebpack: config => {
        config.plugin('html').tap(args => {
            args[0].title= '玉玄道客服系统平台'
            return args
        })

        config.resolve.alias
          .set('@', resolve('src'))
          .set('tim', resolve('src/utils/IM/tim.js'))
        // 删除预加载
        config.plugins.delete('preload')
        config.plugins.delete('prefetch')
        // 压缩代码
        config.optimization.minimize(true)
        // 分割代码
        config.optimization.splitChunks({
            chunks: 'all'
        })
      },
      css: {
        extract: true,
        sourceMap: false,
        loaderOptions: {
          stylus: {
            'resolve url': true,
            // 自定义主题场景
            import: [path.resolve(__dirname, './src/assets/IM/css/base.styl')]
          }
        }
      }
}