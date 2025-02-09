const userFromLocalStorage = localStorage.getItem("user");

// 如果 userFromLocalStorage 不是 null 且不是字符串 "undefined"，才进行 JSON.parse
const parsedUser = userFromLocalStorage && userFromLocalStorage !== "undefined" 
  ? JSON.parse(userFromLocalStorage) 
  : null;

const initialUserState = {
  userId: parsedUser ? parsedUser.userId : null,
  username: parsedUser ? parsedUser.username : null,
  email: parsedUser ? parsedUser.email : null,
  token: parsedUser ? parsedUser.token : null,
};
const userReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      // 登录成功时，更新 state 并存储到 localStorage
      localStorage.setItem("user", JSON.stringify(action.payload));
      return {
        ...state,
        ...action.payload,
      };

    case 'LOGOUT':
      // 登出时，清空用户数据和 token
      localStorage.removeItem("user");
      return initialUserState;

    default:
      return state;
  }
};

export default userReducer;