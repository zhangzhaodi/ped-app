"use strict";
const merge = require("webpack-merge");
const prodEnv = require("./prod.env");

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_BASE: '"http://csiidev2020.picp.vip/pmobile"',
  BANK_ICON:'"http://188.177.155.83:8081"',
  // API_BASE: '"http://192.168.0.168:8088"'
  // API_BASE: '"http://20.0.21.104:8088"'
  // API_BASE: '"http:///192.168.0.156:8088"'
  // API_BASE: '"http:///192.168.0.174:8088"'
});
