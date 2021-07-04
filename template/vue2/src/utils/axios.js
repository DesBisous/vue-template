import qs from 'qs';
import axios, { CancelToken } from 'axios';
import {
  gatewayConfig,
  errorIntercept,
  responseIntercept,
  removeRequestListItem,
  repeatRequestIntercept,
} from '@/utils/http';

const service = axios.create({
  timeout: 15000, // 15秒请求超时
  withCredentials: true, // 是否跨域携带 cookie
  headers: {
    Accept: '*/*',
    'Content-Type': 'application/json',
  },
});

// 添加请求拦截器
service.interceptors.request.use(
  config => {
    // 网关配置
    gatewayConfig(config);
    // 表单提交
    if (config.form) {
      config.data = qs.stringify(config.data);
      config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
    }
    // 文件上传
    if (config.file) {
      config.headers['Content-Type'] = 'multipart/form-data;charset=UTF-8';
    }
    // 配置 CancelToken
    config.cancelToken = new CancelToken(cancelToken => {
      // 重复请求检测
      repeatRequestIntercept(config, cancelToken);
    });

    return config;
  },
  error => {
    // 移除请求记录
    removeRequestListItem(error.response.config);
    // 请求错误拦截
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  function (response) {
    // 移除请求记录
    removeRequestListItem(response.config);
    // 响应拦截
    responseIntercept(response);
    return response.data;
  },
  function (error) {
    // 移除请求记录
    if (error.response) removeRequestListItem(error.response.config);
    // 响应错误拦截
    errorIntercept(error);
    return Promise.reject(error);
  }
);

export default service;
