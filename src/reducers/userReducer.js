import {clearToken } from "../utils/token";

const initialUserState = {
  isLogin:false,
  userId: null,
  username:null,
  email: null,
  avatar: null,
  bio: null,
  preferences: null,
  phone:null
};
const userReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        ...action.payload,
        isLogin:true
      };
    case 'AUTO_LOGIN_SUCCESS':
      return {
        ...state,
        ...action.payload,
        isLogin:true,
      }
    case 'LOGOUT': {
      // 登出时，清空用户数据和 token
      clearToken()
      return {
        ...initialUserState
      }
    }
    default:
      return state;
  }
};

export default userReducer;