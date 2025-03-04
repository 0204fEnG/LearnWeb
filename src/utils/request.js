import axios from "axios";
import { getToken,setToken,setRefreshToken,clearToken } from "./token";
import { refreshToken,isRefreshTokenRequest } from "../api/auth";
const BASE_URL = process.env.REACT_APP_API_URL || "http://192.168.188.8:3200/api";

// 创建 Axios 实例
const instance = axios.create({
  baseURL: BASE_URL, 
  timeout: 5000, 
  headers: {
    "Content-Type": "application/json",
    "Authorization":`Bearer ${getToken()}`
  },
});


instance.interceptors.response.use(
  async (response) => {
    // 如果响应中包含新的 token 和 refreshToken，保存它们
    if (response.data.token) {
      setToken(response.data.token);
    }
    if (response.data.refreshToken) {
      setRefreshToken(response.data.refreshToken);
    }
    return response.data; // 返回正常的响应数据
  },
  async (error) => {
    if (error.response) {
      const { status, config,data } = error.response;
      switch (status) {
        case 400:
          console.error("请求参数错误:", error.response.data);
          break;
        case 403: {
          if (data.message === 'Token失效' && !isRefreshTokenRequest(config)){
            try {
              const refreshIsSuccess = await refreshToken();
              if (refreshIsSuccess) {
                // 刷新成功后重新发起原请求
                const newToken = getToken();
                config.headers.Authorization = `Bearer ${newToken}`;
                const retryResponse = await instance.request(config); // 重新发起原请求
                return retryResponse; // 返回重新发起的请求的响应数据
              } else {
                clearToken();
                return Promise.reject('身份信息过期,请重新登录');
              }
            } catch (err) {
              clearToken();
              return Promise.reject(err);
            }
          }
          break;
        }
        case 404:
          return Promise.reject(error.response.data.message);
        case 500:
          return Promise.reject(error.response.data.message);
        default:
          return Promise.reject(error.response.data.message);
      }
    } else if (error.request) {
      return Promise.reject("请求超时或网络错误，请检查网络");
    } else {
      return Promise.reject(`请求配置错误: ${error.message}`);
    }

    return Promise.reject(error.response?.data.message || error.message);
  }
);


export default instance;