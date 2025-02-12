import request from "../utils/request";
import { getRefreshToken,getToken} from "../utils/token";
export const registerUser = (data) => request.post("/auth/register", data);
export const loginUser = (data) => request.post("/auth/login", data);
export const authLoginUser = () => request.get("/auth/auto-login");
export const test = () => request.get("auth/test", {
    headers:{
        "Authorization":`Bearer ${getToken()}`
    }
})
let promise=null
export const refreshToken = async () => {
    if (promise) {
        return promise
    }
    promise=new Promise(async (resolve) => {
        try {
            const response = await request.get('/auth/refresh-token', {
                headers: {
                    'Authorization': `Bearer ${getRefreshToken()}`
                },
                __isRefreshToken: true
            })
            resolve(true)
        }
        catch (error) {
            resolve(false)
        }
    })
    promise.finally(() => {
        promise=null
    })
    return promise
    
}
export const isRefreshTokenRequest = (config) => {
    return !!config.__isRefreshToken
}