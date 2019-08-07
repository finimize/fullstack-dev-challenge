const chai = require('chai');

[
  require('chai-http'),
]
.map(plugin => chai.use(plugin))

module.exports = chai;
