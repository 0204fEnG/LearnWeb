import request from "../utils/request";
import { getRefreshToken } from "../utils/token";
export const registerUser = (data) => request.post("/auth/register", data);
export const loginUser = (data) => request.post("/auth/login", data);
export const authLoginUser = () => request.get("/auth/auto-login");
export const refreshToken = async () => {
    await request.get('/auth/refresh-token', {
        headers: {
            'Authorization': `Bearer ${getRefreshToken()}`
        },
        __isRefreshToken:true
    })
}
export const isRefreshTokenRequest = (config) => {
    return !!config.__isRefreshToken
}