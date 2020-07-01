const configDev = require('../../vue.dev');
const Uri = require('uri-js');

/**
 * 开发辅助函数
 * developHelper.js
 */
module.exports = {
    getProxy () {
        let endServers = configDev.endServers;
        let conf = {};
        let serverUrl;
        for (let serverKey in endServers) {
            serverUrl = endServers[serverKey];
            let uriConfig = Uri.parse(serverUrl)
            // {   http://localhost:8080/mock
            //     fragment: undefined
            //     host: "localhost"
            //     path: "/mock"
            //     port: 8080
            //     query: undefined
            //     reference: "absolute"
            //     scheme: "http"
            //     userinfo: undefined
            // }
            if (uriConfig.path === '/') {
                // 处理以/结尾的服务器地址配置
                throw new Error(`vue.dev.js中服务器不能以/结尾${serverUrl}`)
            }

            let confPath;
            if (serverKey === 'default') {
                confPath = serverKey;
                conf[confPath] = {
                    target: serverUrl,
                    pathRewrite: { [`^/${confPath}`]: '/' },
                    // `^/${confPath}`]: '/'
                }
            } else {
                confPath = uriConfig.path || `/${serverKey}`;
                
                if (conf[confPath]) {
                    // 后台起一个应用名
                    throw new Error(`proxy的地址名不能重复注册${confPath}`);
                }

                conf[confPath] = {
                    target: serverUrl,
                    pathRewrite: {[`^${confPath}`]: ''}
                }
            }
            // 代理地址配置
        }
        console.log(conf, 111111)
        return conf
    }
}