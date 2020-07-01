const test = require('./test')
/**
 * @param path 接口路径
 * @param method 接口类型默认get，get、post、put
 * @param server nginx配置默认default
 * @param isFormData 默认false, 表单格式true，false为json格式
 */
const api = {
  path: '/test',
  method: 'GET',
  server: 'mock',
  isFormData: false
};
Object.assign(
  api,
  test
)
module.exports = api;