module.exports = {
    lintOnSave: false, //关闭eslint代码检查
    configureWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            // 为生产环境修改配置...
        } else {
            // 为开发环境修改配置...
        }
    },
    devServer: {
        port: 8085,
        host: "localhost",
        https: false,
        open: true,
        proxy: {
            "/zl_api": {
                target: "https://testsaas.imeduplus.com",
                changeOrigin: true
            },
            "/bluewhale": {
                target: "https://testboss.imeduplus.com",
                changeOrigin: true
            },
        }
    },
    chainWebpack: config => {
        // GraphQL Loader
        config.module
            .rule('md')
            .test(/\.md$/)
            .use('vue-loader')
                .loader('markdown-to-vue-loader')
                .end()
        // config.module
        //     .rule('js')
        //     .test(/\.js$/)
        //     .use('babel-loader')
        //         .loader('syntax-dynamic-import')
        //         .end()
    }
};