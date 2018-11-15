const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const path = require('path');
const DEVELOPMENT = 'development';

const DEFAULT_OPTIONS = {
  mode: DEVELOPMENT,
  chunk: true,
  visualization: false
};

const sassLoaders = [
  {
    loader: "css-loader",
    options: {
      minimize: true,
      sourceMap: true
    }
  },
  'sass-loader',
];

module.exports = (_env, options) => {
  options = {...DEFAULT_OPTIONS, ...options};
  const isDevMode = options.mode === DEVELOPMENT;
  const outputPath = path.resolve(__dirname, `dist/${isDevMode ? 'dev': 'prod'}`)

  return {
    mode: options.mode,

    target: 'web',

    devtool: isDevMode ? 'eval-source-map' : false,
    
    resolve: {
      extensions: ['.js', '.json', '.ts'],
    },

    entry: {
      polyfills: './src/polyfills.ts',
      main: './src/main.ts',
      styles: './src/styles.scss',
    },
    
    output: {
      path: outputPath,
      filename: '[name].js',
      chunkFilename: '[name]-chunk.js',
    },

    optimization: {
      concatenateModules: false,
      splitChunks: options.chunk ? {cacheGroups: {common: {chunks: 'all', minChunks: 2}}} : false
    },

    module: {
      rules: [
        {
          test: /\.ts$/,
          use: [
            {
              loader: 'awesome-typescript-loader', 
              query: {
                configFileName: './tsconfig.json',
                declaration: false
              }
            },
            'angular-router-loader',
            'angular2-template-loader'
          ],
          exclude: [/\.(spec|e2e)\.ts$/, /node_modules/]
        },
      
        {
          test: /\.html$/,
          use: [
            {
              loader: 'html-loader',
              options: {
                root: path.resolve(__dirname, 'src', 'app'),
                attrs: ['img:src', 'link:href'],
                caseSensitive: true
              }
            }
          ]
        },

        {
          test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2|ico)$/,
          use: [
            'file-loader',
          ]
        },

        // GLOBAL styles.css
        {
          test: path.resolve(__dirname, 'src', 'styles.scss'),
          exclude: [/\.component\.scss$/i],
          use: [
            ...[isDevMode ? 'style-loader' : MiniCssExtractPlugin.loader],
            ...sassLoaders
          ]
        },

        // COMPONENT styles
        {
          test: /\.component\.scss$/i,
          
          exclude: /node_modules/,
          use: [
            'to-string-loader',
            ...sassLoaders
          ],
        },
      ]
    },

    plugins: [
      new MiniCssExtractPlugin({
        filename: '[name].[hash].css',
        chunkFilename: '[id].[hash].css',
      }),
      new HtmlWebpackPlugin({
        template: './src/index.html'
      }),
      new ScriptExtHtmlWebpackPlugin({defaultAttribute: 'defer'}),
      ...(options.visualization ? [new BundleAnalyzerPlugin({analyzerMode: 'static'})] : []),
    ]
  };
};
