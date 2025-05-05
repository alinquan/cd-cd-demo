'use strict'
const autoprefixer = require('autoprefixer')
const path = require('path')
function resolve(dir) {
    return path.join(__dirname, dir)
}
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

const port = 8484

const APIURL = 'http://ecloud.mdcloud.net.cn/api'

module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
    outputDir: 'dist',
    assetsDir: 'static',
    lintOnSave: process.env.NODE_ENV === 'development',
    productionSourceMap: false,
    devServer: {
        port,
        overlay: {
            warnings: false,
            errors: true
        },
        disableHostCheck: true,
        proxy: {
            '/api': {
                target: APIURL,
                changeOrigin: true,
                ws: false,
                pathRewrite: { '^/api': '/' }
            }
        }
    },
    css: {
        loaderOptions: {
            sass: {
                // prependData: `@import "~@/styles/variables.scss";`
            },
            postcss: {
                plugins: [autoprefixer]
            }
        }
    },
    configureWebpack: {
        name: 'JoinChain',
        resolve: {
            alias: {
                '@': resolve('src')
            }
        },
        plugins: [
            AutoImport({
                resolvers: [ElementPlusResolver()],
            }),
            Components({
                resolvers: [ElementPlusResolver()],
            }),
        ],
    },
    chainWebpack(config) {
        // set svg-sprite-loader
        config.module
            .rule('svg')
            .exclude.add(resolve('src/icons'))
            .end()
        config.module
            .rule('icons')
            .test(/\.svg$/)
            .include.add(resolve('src/icons'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            })
            .end()

        // set preserveWhitespace
        // config.module
        //     .rule('vue')
        //     .use('vue-loader')
        //     .loader('vue-loader')
        //     .tap(options => {
        //         options.compilerOptions.preserveWhitespace = true
        //         return options
        //     })
        //     .end()

        config
            .when(process.env.NODE_ENV === 'development',
                config => config.devtool('cheap-source-map')
            )
    },
}
