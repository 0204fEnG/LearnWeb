export const getToken = () => {
    // 从 localStorage 获取 token
    const token = localStorage.getItem('token');
    
    // 如果 token 不存在，返回 null 或者提示用户登录
    if (!token) {
        return null;
    }
    // 如果 token 有效，返回 token
    return token;
} 


export const setToken = (token) => {
    if (!token) {
        return;
    }

    // 存储 token 到 localStorage
    localStorage.setItem('token', token);
}

export const getRefreshToken = () => {
    // 从 localStorage 获取 refreshToken
    const refreshToken = localStorage.getItem('refreshToken');
    
    // 如果 refreshToken 不存在，返回 null 或者提示用户登录
    if (!refreshToken) {
        return null;
    }
    // 如果 refreshToken 有效，返回 token
    return refreshToken;
}

export const setRefreshToken = (refreshToken) => {
    if (!refreshToken) {
        return;
    }

    // 存储 token 到 localStorage
    localStorage.setItem('refreshToken', refreshToken);
}

export const clearToken = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('refreshToken')
}