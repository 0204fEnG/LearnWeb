const tokenFromLocalStorage = localStorage.getItem("token");

// 如果 userFromLocalStorage 不是 null 且不是字符串 "undefined"，才进行 JSON.parse
const parsedToken = tokenFromLocalStorage && tokenFromLocalStorage !== "undefined" 
  ? JSON.parse(tokenFromLocalStorage) 
  : null;

const initialUserState = {
  token: parsedToken ? parsedToken : null,
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
      localStorage.setItem("token", JSON.stringify(action.payload.token));
      return {
        ...state,
        ...action.payload.user,
        token:action.payload.token
      };
    case 'AUTH_LOGIN_SUCCESS':
      return {
        ...state,
        ...action.payload.user,
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