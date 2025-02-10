const tokenFromLocalStorage = localStorage.getItem("token");

const initialUserState = {
  token: tokenFromLocalStorage ? tokenFromLocalStorage : null,
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
      // 登录成功时，更新 state 并存储到 localStorage
      localStorage.setItem("token", action.payload.token);
      return {
        ...action.payload.user,
        token: action.payload.token,
        isLogin:true
      };
    case 'AUTO_LOGIN_SUCCESS':
      return {
        token: state.token,
        isLogin:true,
        ...action.payload,
      }
    case 'LOGOUT':
      // 登出时，清空用户数据和 token
      localStorage.removeItem("token");
      return {
        ...initialUserState,
        token: null
      }
    default:
      return state;
  }
};

export default userReducer;