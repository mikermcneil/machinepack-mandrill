// Export Machine.pack() object for convenience
var path = require('path');

module.exports = require('machine').pack({
  pkg: require('./package.json')
});
