/**
 文件：src/utils/backend.vue
 作者：陈凯
 时间：2020-04-23
 描述：请求后端的工具
 */

import axios from 'axios';

let mAxiosHandler = null;

/**
 * 读取api配置
 * @param {*} value
 */
function getApiConf(value) {
    if (!value) {
        throw new Error('Api path is null');
    }
    if (typeof (value) === 'string') {
        return {
            path: value,
            method: 'GET'
        }
    } else {
        if (!value) {
            throw new Error('Api未配置' + JSON.stringify(value));
        }
        if (typeof (value) !== 'object') {
            throw new Error('Api配置错误' + JSON.stringify(value));
        }
        if (!value.method) {
            throw new Error('Api配置错误，缺少method属性' + JSON.stringify(value));
        }
        if (!value.path) {
            throw new Error('Api配置错误，缺少path属性' + JSON.stringify(value));
        }
        if (!value.isFormData) {
            value.isFormData = false
        }
        return {
            path: value.path,
            method: value.method.toLowerCase(),
            server: value.server,
            isFormData: value.isFormData
        };
    }
}

/**
 * 根据api.path获取完整的url
 * @param {*} api
 */
function getUrl(api) {
    if (process.env.NODE_ENV === 'development') {
        // 同站点截取url的path,如：http://location:9090
        let pathName = window.location.origin;
        let appName = api.server || 'default';
        return `${pathName}/${appName}${api.path}`
    } else {
        let server = api.server || 'default';
        return window.config.servers[server] + api.path
    }
}

/**
 * 构建url参数
 * @param {*} json
 */

function buildQuery(json) {
    if (!json) {
        return '';
    }
    let query = '?';
    let paramConcat = '&';
    for (let i in json) {
        query += (i + '=' + encodeURIComponent(json[i]) + paramConcat)
    }
    if (query.charAt(query.length - 1) === paramConcat) {
        query = query.substr(0, query.length - 1);
    }
    return query;
}


/**
 * 发送http请求
 * @param {*} settings
 */
function request(settings) {
    let { api, data, options = {}, query, restful = true, isMessageError } = settings

    api = getApiConf(api);
    let url = getUrl(api);
    let isFormData = api.isFormData// true 表单类型，false对象类型
    let isDataAsQuery = (api.method === 'get' || api.method === 'delete') && !query && data;
    if (isDataAsQuery) {
        query = data;
    }
    let params = null;
    if (restful) {
        params = query;
    } else {
        url += buildQuery(query)
    }

    let axios = createAxiosInstance({
        url,
        responseType: settings.responseType,
        params,
        isFormData,
        data,
        options
    })
    if (isMessageError && typeof mAxiosHandler === 'function') {
        mAxiosHandler(axios, settings)
    }
    return new Promise((resolve, reject) => {
        axios.request({
            method: api.method,
            data: data,
            params: params
        }).then(response => {
            // 此处一定要做判断，因为拦截器可能什么也没有返回
            if (response) {
                resolve(response.data);
            }
        }).catch(error => {
            reject(error);
        })
    })
}


/**
 * 创建axios实例
 * @param {
 *  url 请求基地址
 *  options http请求头参数
 *  params 请求参数拼接在url上面
 *  data 请求参数放请求体里
 * } 
 */
function createAxiosInstance({ url, responseType, params, data, isFormData, options }) {
    return axios.create({
        baseURL: url,
        timeout: 45000, // 请求超时时长
        headers: Object.assign({
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': isFormData ? 'application/x-www-form-urlencoded' : 'application/json',
        }, options),
        responseType: responseType | 'json',
        params: params || {},
        data: data,
        
    })
}


/**
 * 请求代理类
 */
export default {
    /**
     * 获取url
     */
    getUrl(apiKey, data) {
        debugger
        let api = getApiConf(apiKey);
        let url = getUrl(api);
        if (typeof data === 'object') {
            url += buildQuery(data);
        }
        return url;
    },

    /**
     * 请求后端
     * @param api 获取URL用，即定义在src/conf/api.js中的api的Key
     * @param data JSON数据
     * @param options ajax附件参数，主要是http header，用的比较少
     * @param isMessageError 当出现错误，是否弹窗提示
     * @returns {*}
     */
    request(api, data, options, isMessageError = true) {
        return request({
            api,
            data,
            options,
            isMessageError
        })
    },

    /**
     * @param {
     * 	api: '' // piKey 获取URL用，即定义在src/conf/api.js中的api的Key
     *  data: JSNO对象，POST或者PUT到服务端的JOSON数据，如果是GET或者Delete则实际转换成url参数
     *  query: FormData
     * }
     */
    send(settings) {
        return request(settings);
    },
    setAxiosHandler(handler) {
        mAxiosHandler = handler;
    },

    /**
     * 转换错误
     * @param {*} error
     */
    convertError (error) {
        let ret = {code: -1};
        let response = error.response;
        if (response) {
            ret.code = response.status;
            let url = response.config.url;
            if (response.status === 504) {
                ret.msg = '服务器网关超时，请联系管理员，请求：' + url;
            } else if (response.status === 404) {
                ret.msg = '服务未启动或未找到接口，请求：' + url;
            } else {
                ret.msg = '服务器繁忙，请稍后再试，请求：' + url;
            }
        } else {
            ret.msg = '无法连接服务器，请检查您的网络';
        }
        return ret;
    },
}