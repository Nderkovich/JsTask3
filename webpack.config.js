const path = require('path');

module.exports = {
    entry: './assets/js/main.js',
    output: {
        path: path.resolve(__dirname, 'js'),
        filename: 'bundle.js'
    },
    node: {
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
    },
};