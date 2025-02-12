import axios from "axios";
import { getToken,setToken,setRefreshToken } from "./token";
import { refreshToken,isRefreshTokenRequest } from "../api/auth";
// 动态 `baseURL`（可在 `.env` 文件中配置）
const BASE_URL = process.env.REACT_APP_API_URL || "http://192.168.178.8:3200/api";

// 创建 Axios 实例
const instance = axios.create({
  baseURL: BASE_URL, 
  timeout: 5000, 
  headers: {
    "Content-Type": "application/json",
    "Authorization":`Bearer ${getToken()}`
  },
});


//响应拦截器（更详细的错误处理）
instance.interceptors.response.use(
  async (response) => {
    // 如果 response.data 中包含 token 和 refreshToken，保存到本地
    if (response.data.token) {
      setToken(response.data.token);
    }
    if (response.data.refreshToken) {
      setRefreshToken(response.data.refreshToken);
    }
    if (response.data.message === 'Token失效'&&!isRefreshTokenRequest(response.config)) {
      await refreshToken()
      response.config.headers.Authorization=`Bearer ${getToken()}`
      const newResponse = await instance.request(response.config)
      return newResponse
    }
    return response.data
  },
  async (error) => {
    if (error.response) {
      const { status } = error.response;
      // **不同状态码的错误处理**
      switch (status) {
        case 400:
          console.error(400);
          break;
        case 401:
          console.warn(401);
          break;
        case 403:
          console.warn(403);
          break;
        case 404:
          console.warn(404);
          break;
        case 500:
          console.error(500);
          break;
        default:
          console.error('default error');
      }
    } else if (error.request) {
      console.error("request error");
    } else {
      console.error('config error');
    }

    return Promise.reject(error.response?.data || error.message);
  }
);


export default instance;