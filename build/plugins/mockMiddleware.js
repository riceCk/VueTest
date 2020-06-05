let fs = require('fs');
let path = require('path');

/**
 * mock拦截
 * @param isNext 是否可以继续执行
 * @returns {Function}
 */

module.exports = function mockMiddleware (isNext = true) {
  // mock配置文件路径
  let configPath = '../../mock/mockConfig.js';
  let mockConfigList = require(configPath);

  let fileUtil = require('../util/fileUtil.js')
  let dir = './mock'; // 监控的根文件
  let fileList = [];
  // fileUtil.getFil
  fileUtil.getFileList(dir).then(result => {
    console.log(result, 1231)
  })
}