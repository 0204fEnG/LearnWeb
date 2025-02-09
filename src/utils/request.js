import axios from "axios";

// 动态 `baseURL`（可在 `.env` 文件中配置）
const BASE_URL = process.env.REACT_APP_API_URL || "http://192.168.178.8:3100/api";

// 创建 Axios 实例
const instance = axios.create({
  baseURL: BASE_URL, 
  timeout: 5000, 
  headers: {
    "Content-Type": "application/json",
  },
});

// 请求拦截器（可添加 Token）
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; 
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 响应拦截器（更详细的错误处理）
instance.interceptors.response.use(
  (response) => response.data, 
  (error) => {
    if (error.response) {
      const { status, data } = error.response;
      // **不同状态码的错误处理**
      switch (status) {
        case 400:
          console.error("请求参数错误:", data);
          break;
        case 401:
          console.warn("未授权，请重新登录");
          localStorage.removeItem("token");
          window.location.href = "/auth"; // 可跳转到登录页
          break;
        case 403:
          console.warn("权限不足");
          break;
        case 404:
          console.warn("请求资源不存在:", data);
          break;
        case 500:
          console.error("服务器错误，请稍后再试");
          break;
        default:
          console.error("请求错误:", data);
      }
    } else if (error.request) {
      console.error("请求超时或网络错误，请检查网络");
    } else {
      console.error("请求配置错误:", error.message);
    }

    return Promise.reject(error.response?.data || error.message);
  }
);

// // **自动刷新 Token（可选）**
// const refreshToken = async () => {
//   try {
//     const refreshToken = localStorage.getItem("refreshToken");
//     if (!refreshToken) throw new Error("无刷新令牌");

//     const res = await axios.post(`${BASE_URL}/auth/refresh`, { token: refreshToken });
//     localStorage.setItem("token", res.data.token);
//     return res.data.token;
//   } catch (error) {
//     console.error("刷新 Token 失败，请重新登录");
//     localStorage.removeItem("token");
//     window.location.href = "/login";
//     return null;
//   }
// };

// **日志输出（仅限开发模式）**
// if (process.env.NODE_ENV === "development") {
//   instance.interceptors.request.use((config) => {
//     console.log("📡 请求:", config);
//     return config;
//   });

//   instance.interceptors.response.use(
//     (response) => {
//       console.log("✅ 响应:", response);
//       return response;
//     },
//     (error) => {
//       console.error("❌ 错误:", error);
//       return Promise.reject(error);
//     }
//   );
// }

export default instance;