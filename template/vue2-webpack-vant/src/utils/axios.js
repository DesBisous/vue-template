import qs from 'qs';
import axios, { CancelToken } from 'axios';

const service = axios.create({
  timeout: 15000, // 15秒请求超时
  withCredentials: true, // 是否跨域携带 cookie
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

// 添加请求拦截器
service.interceptors.request.use(
  config => {
    /*eslint no-unused-vars: "off"*/
    let cancelToken = null;
    // 表单提交
    if (config.form) {
      config.data = qs.stringify(config.data);
      config.headers['Content-Type'] =
        'application/x-www-form-urlencoded;charset=UTF-8';
    }
    // 文件上传
    if (config.file) {
      config.headers['Content-Type'] = 'multipart/form-data;charset=UTF-8';
    }
    // 配置 CancelToken
    config.cancelToken = new CancelToken(c => {
      cancelToken = c;
    });

    // api 请求时，登录权限检测

    // 重复请求检测

    return config;
  },
  error => {
    // 请求错误拦截
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  function (response) {
    // 响应拦截
    console.log(response);
    return response.data;
  },
  function (error) {
    // 响应错误拦截
    return Promise.reject(error);
  }
);

export default service;
