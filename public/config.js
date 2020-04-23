window.config = {
    // 版本号
    version: 'VERSION',
    servers: {
        default: 'http://localhost:3010/appName', // 必须和浏览器打开的ip端口相同
        wp: 'http://localhost:3010/wp', // 平台门户登录模拟
        uc: 'http://localhost:3010/uc',   // UC模拟单点并获取用户信息
    },

    systemId: 'APP008',

    // 登录错误，跳转到平台门户
    wpUrl: 'http://localhost:9090/',
}