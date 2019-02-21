const path = require('path')
const merge = require('webpack-merge')
const webpack = require('webpack')

const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const DotEnvPlugin = require('dotenv-webpack')
const parts = require('./webpack.parts.config')

const paths = {
  base: path.resolve('src'),
  app: path.resolve('src/index.ts'),
  dist: path.resolve('www'),
  template: path.resolve('index.html'),
  tsConfigDev: path.resolve('tsconfig.dev.json'),
}

const commonConfig = merge([
  {
    target: 'web',
    context: paths.base,
    entry: paths.app,
    output: {
      filename: 'game/[name].js',
      chunkFilename: 'game/[name].js',
      publicPath: '',
      path: paths.dist,
    },
    resolve: {
      extensions: ['.js', '.ts'],
    },
    plugins: [
      new CaseSensitivePathsPlugin(),
      new CopyWebpackPlugin([
        {
          from: '../assets',
          to: 'assets',
        },
      ]),
      new DotEnvPlugin(),
    ],
  },
])

const developmentConfig = merge([
  parts.sourceMaps('cheap-module-source-map'),

  parts.devServer({
    host: process.env.HOST,
    port: process.env.PORT,
  }),

  { plugins: [new webpack.NamedModulesPlugin()] },

  parts.envVar('development'),
  parts.loadJs({
    options: {
      configFile: paths.tsConfigDev,
    },
  }),
])

const developmentDeviceConfig = merge([
  parts.envVar('device'),
  developmentConfig,
])

const productionConfig = merge([
  parts.sourceMaps('source-map'),

  parts.cleanup([
    path.resolve(paths.dist, 'game'),
    path.resolve(paths.dist, 'assets'),
  ]),

  parts.envVar('production'),

  {
    performance: {
      maxEntrypointSize: 2000000,
      maxAssetSize: 1100000,
    },
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          test: /\.js$/,
          mangle: true,
          uglifyOptions: {
            compress: {
              sequences: true,
              dead_code: true,
              conditionals: true,
              booleans: true,
              unused: true,
              if_return: true,
              join_vars: true,
              drop_console: true,
            },
            output: {
              comments: false,
              beautify: false,
            },
          },
        }),
      ],
    },
  },
  parts.loadJs({}),
])

const analyzeConfig = merge([parts.analyze()])

module.exports = env => {
  let envConfig
  switch (env) {
    case 'production':
      envConfig = productionConfig
      break
    case 'device':
      envConfig = developmentDeviceConfig
      break
    default:
      envConfig = developmentConfig
      break
  }
  const config = merge(
    commonConfig,
    {
      stats: 'minimal',
    },
    envConfig,
  )
  if (process.env.npm_config_analyze) {
    return merge(config, analyzeConfig)
  }

  return config
}
