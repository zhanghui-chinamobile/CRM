let merge = require('webpack-merge');
let prodEnv = require('./prod.env');

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  WS_ADDRES:'"ws://10.9.236.232:18080"'
  // WS_ADDRES:'"ws://localhost:18080"'
});
