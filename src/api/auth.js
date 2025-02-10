import request from "../utils/request";
export const registerUser = (data) => request.post("/auth/register", data);
export const loginUser = (data) => request.post("/auth/login", data);
export const authLoginUser = () => request.get("/auth/auth-login");