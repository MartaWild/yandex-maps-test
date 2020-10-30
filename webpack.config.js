var path = require('path');
var HtmlPlugin = require('html-webpack-plugin');
module.exports = {
    entry: {
        main: './src/app.tsx',
    },
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'dist/'),
    },
    plugins: [new HtmlPlugin({ template: './src/templates/index.html' })],
    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'ts-loader',
                    },
                ],
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
};
