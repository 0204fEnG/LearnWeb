// src/actions/userActions.js
export const loginSuccess = (data) => ({
  type: 'LOGIN_SUCCESS',
  payload: data,
});

export const autoLoginSuccess = (data) => ({
  type: 'AUTO_LOGIN_SUCCESS',
  payload:data
});
export const logout = () => ({
  type: 'LOGOUT',
});