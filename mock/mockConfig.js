/**
 * 测试数据配置，可以使用函数或其他工具类生成模拟数据
 * @type {{aaa: Array}}
 */
module.exports = [
  {
    url: '/test/testMock',
    data: require('./test/testMock'),
    mock: true, // 是否启动当前项测试
  },
  {
    url: '/user/isAccessAllowed',
    data: require('./user/isAccessAllowed'),
    mock: true, // 模拟单点登录返回数据
  },
  {
    url: '/appName/sysCommon/queryConfig',
    data: require('./appName/sysCommon/queryConfig'),
    mock: true,
  },
  {
    url: '/yqtj',
    data: require('./test/yqtj'),
    mock:true
  },
  {
    url:'/sjff',
    data: require('./test/sjff'),
    mock:true
  },
    {
        url:'/jingqingbobao',
        data: require('./test/jqbb'),
        mock:true
    }
];