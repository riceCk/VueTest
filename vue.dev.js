module.exports = {
    devProxy: {
        host: '0.0.0.',
        port: 8090
    },
    endServers: {
        default: 'http://localhost:8080/mock',   // 使用本地mock数据
        wp: 'http://localhost:3010/wp',  // 平台门户登录模拟
        trtc: 'https://t-video.aegis-info.com',
        newClient: 'http://192.168.11.22:8184' // 舆情客户端
    }
}