const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// This plugin is an alternative to the style-loader, which seems to be better suited for static webpages
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: {
        index: './src/js/index.js'
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        // publicPath: '/dist',
        filename: 'js/[name].bundle.js',
        assetModuleFilename: 'static/[hash][ext][query]'
    },
    devtool: 'source-map',
    stats: {
        children: true
    },
    module: {
        rules: [
            // Handlebars
            {
                test: /\.hbs$/,
                use: [
                    {
                        loader: 'handlebars-loader',
                        options: {
                            // Path to your custom js file, which has Handlebars with custom helpers registered
                            runtime: path.join(__dirname, 'handlebars.config.js'),
                            precompileOptions: {
                                knownHelpersOnly: false,
                            },
                            inlineRequires: '/assets/*'
                        }
                    }
                ]
            },
            // JS
            {
                test: /\.(js|jsx)$/,
                exclude: [/node_modules/, /extlib/],
                use: ['babel-loader', 'eslint-loader'],
                // options: { presets: ['@babel/env'] }
            },
            // SASS, CSS
            {
                test: /\.(css|s[ac]ss)$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
            },
            // Images
            {
                test: /\.(png|jpg|jpeg|gif|webp|avif)$/i,
                type: 'asset/resource', // Webpack 5.x: loads file into output folder (file-loader)
            },
            {
                test: /\.(svg)$/i,
                // type: 'asset/source', // currently not necessary
                type: 'asset/inline', // currently better for this project
            },
            // Fonts
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource', // Webpack 5.x: loads file into output folder (file-loader)
            },
            // GLSL
            {
                test: /\.(glsl|vs|fs|vert|frag)$/i,
                type: 'asset/source', // Webpack 5.x: loads file content into bundled JS file (raw-loader)
                exclude: /node_modules/,
                loader: 'glslify-loader'
            },
            // PDF
            {
                test: /\.(pdf)$/i,
                type: 'asset/resource'
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
            template: './src/templates/index.hbs',
            favicon: './src/assets/icons/favicon.ico'
        }),
        new HtmlWebpackPlugin({
            template: './src/templates/legal.hbs',
            filename: 'legal.html',
            favicon: './src/assets/icons/favicon.ico'
        })
    ]
}
