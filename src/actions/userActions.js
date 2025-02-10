// src/actions/userActions.js
export const loginSuccess = (data) => ({
  type: 'LOGIN_SUCCESS',
  payload: data,
});

export const authLoginSuccess = (data) => ({
  type: 'AUTH_LOGIN_SUCCESS',
  payload:data
});
export const logout = () => ({
  type: 'LOGOUT',
});