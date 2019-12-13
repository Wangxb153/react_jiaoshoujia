// axios封装，请求拦截、响应拦截、错误统一处理

import axios from 'axios'
import {message} from 'antd'
// 环境的切换

// 请求超时时间
axios.defaults.timeout = 5000

// post请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

//请求拦截器
axios.interceptors.request.use(
    config => {
        // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header上加上token
        // 不用每次请求都手动添加了

        // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断

        // const token = store.state.token
        // token && (config.headers.Authorization = token)
        return config
    },
    error => {
        return Promise.error(error)
    }
)

// 响应拦截器
axios.interceptors.response.use(
    response => {
        if(response.status === 200) {
            return Promise.resolve(response)
        } else {
            return Promise.reject(response)
        }
    },

    error => {
        if(error.response.status) {
            switch (error.response.status) {
                // 401: 未登录
                case 401:
                    // todo 提示未登陆，跳转到登陆页面
                    message.info("未登录，请登录")
                    break
                // 403 token过期
                // 登录过期对用户进行提示，清楚本地token和react的token对象
                // 跳转登录页面
                case 403:
                    message.info('token已过期，请登录')
                    // localStorage.removeItem('token')
                    // store.commit('loginSuccess',null)
                    // 跳转到登录页面
                    //
                    break
                // 请求不存在 
                case 404:
                    // 提示网络请求不存在
                    message.info("网络好像出问题了哦！")
                    break
                default:
                    // 其他错误
                    message.info(error.response.data.message)
            }
            return Promise.reject(error.response)
        }
    }
)

function axiosRequest(method, url, params) {
    if(params){
        // todo 对params统一的进行处理
        params = params
    }
    // debugger
    const root = 'http://127.0.0.1:8888'
    return new Promise((resolve, reject) => {
        axios({
            method: method,
            url: url,
            data: method === 'POST' || method === 'PUT' ? params : null,
            params: method === 'GET' || method === 'DELETE' ? params : null,
            baseURL: root,
            withCredentials: true
        }).then(res => {
            console.log(res.data)
            resolve(res.data)
        }).catch(err => {
            reject(err.data)
        })
    })
}


export default {
    get: function (url,params) {
        console.log(url)
        console.log(axiosRequest('GET', url, params))
        return axiosRequest('GET', url, params)
    },
    post: function (url,params) {
        return axiosRequest('POST',url, params)
    },
    put: function (url,params) {
        return axiosRequest('PUT',url, params)
    },
    delete: function (url,params) {
        return axiosRequest('DELETE',url, params)
    },
}
// // get方法，对应get请求
// // @param {string} url [请求的url地址]
// // @param {Object} params [请求时携带的参数]
// export function get(url, params) {
//     return new Promise((resolve, reject) => {
//         axios.get(url, {
//             params: params
//         })
//         .then(res => {
//             resolve(res.data)
//         })
//         .catch(err => {
//             debugger
//             reject(err.data)
//         })
//     })
// }

// // post方法，对应post请求
// // @param {string} url [请求的url地址]
// // @param {Object} params [请求时携带的参数]
// export function post(url, params) {
//     return new Promise((resolve, reject) => {
//         axios.post(url, QS.stringfy(params))
//         .then(res => {
//             resolve(res.data)
//         })
//         .catch(err => {
//             reject(err.data)
//         })
//     })
// }