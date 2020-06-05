let fs = require('fs');
require('shelljs/global')

module.exports = {
    mkdir (assetsPath) {
        mkdir('-p', assetsPath);
    },

    /**
     * 获取文件列表
     * @param dir
     * @returns {Promise<any>}
     */
    getFileList (dir) {
        return new Promise.
    }
}