module.exports={
    configureWebpack:{
        resolve:{
             alias:{
                 'assets':'@/assets',
                 'common':'@/common',
                 'components':'@/components',
                 'network':'@/network',
                 'views':'@/views'
             }
        }
    },
    outputDir: 'dist',  //build输出目录
    assetsDir: 'assets', //静态资源目录（js, css, img）
    lintOnSave: false, //是否开启eslint
}