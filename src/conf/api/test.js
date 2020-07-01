/**
 * @param path 接口路径
 * @param method 接口类型默认get，get、post、put
 * @param server nginx配置默认default
 * @param isFormData 默认false, 表单格式true，false为json格式
 */

module.exports = {
  test: {
    userSig: {
      path: '/charge/api/vod/userSig',
      method: 'GET',
      server: 'trtc'
    },
    quanguoyiqing: {
      path: '/epidemic/left/quanguoyiqing',
      method: 'POST',
    },
    // 实时舆情
    shishiyuqing: {
      path: '/epidemic/right/shishiyuqing',
      method: 'POST',
    },
    statistics: {
      path: '/imonitor/home/negative/statistics',
      method: 'POST',
      server: 'newClient'
    }
  }
}
