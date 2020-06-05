'use strict';
const merge = require('webpack-merge');
const prodeEnv = require('./prod.env');
const devDefault = require('./utils/serverProxy');
module.exports = merge(
  prodeEnv,
  {
    NODE_ENV: 'development',
  },
  devDefault(),
)