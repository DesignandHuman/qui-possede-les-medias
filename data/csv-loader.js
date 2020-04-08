const loaderUtils = require('loader-utils')
const parse = require('csv-parse/lib/sync')

module.exports = function (csv) {
  const config = loaderUtils.getOptions(this)
  const parsed = parse(csv, config)

  if (this.cacheable) {
    this.cacheable()
  }

  return 'module.exports = ' + JSON.stringify(parsed)
}
