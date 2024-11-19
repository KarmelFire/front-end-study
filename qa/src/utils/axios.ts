import axios from 'axios';

// 创建一个 Axios 实例
const api = axios.create({
  baseURL: 'http://localhost:8080', // 替换为你的后端接口地址
  timeout: 10000, // 请求超时设置
});

// // 请求拦截器
// instance.interceptors.request.use(
//   (config) => {
//     // 可以在这里添加请求头，或其他配置
//     // config.headers['Content-Type'] = 'application/json';
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // 响应拦截器
// instance.interceptors.response.use(
//   (response) => {
//     // 可以在这里对响应数据进行处理
//     return response.data; // 返回响应数据
//   },
//   (error) => {
//     // 可以在这里处理错误
//     return Promise.reject(error);
//   }
// );

export default api;
