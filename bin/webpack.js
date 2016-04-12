var webpack = require('webpack')
var webpackConfig = require('../build/webpack/development_hot')

const compiler = webpack(webpackConfig)

compiler.run(function (err, stats) {
  if (err) console.error(err)
  console.log(stats)
})
