const path = require('path');

module.exports = {
    outputDir: path.resolve(__dirname, '../server/public'),
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:5001'
            }
        }
    },
    configureWebpack: {
        
        devtool: 'source-map'
    }
}
// module.exports = {
//     outputDir: path.resolve(__dirname, '../server/public'),
//     devServer: {
//         // host: 'localhost',
//         // disableHostCheck: true,
//         proxy: {
//             '/api': {
//                 target: 'http://localhost:5001/'
//             }
//         }
//     },
//     configureWebpack: {
        
//         devtool: 'source-map'
//     }
// }