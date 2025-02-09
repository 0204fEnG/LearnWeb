import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../reducers/userReducer";  // 引入你的 Reducer

// 创建 Redux store
const store = configureStore({
  reducer: {
    user: userReducer,  // 你的用户 reducer
  },
  // Redux Toolkit 自动启用 DevTools，不需要手动配置
});

export default store;