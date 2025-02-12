export const getToken = () => {
    // 从 localStorage 获取 token
    const token = localStorage.getItem('token');
    
    // 如果 token 不存在，返回 null 或者提示用户登录
    if (!token) {
        console.warn('本地存储未找到token,请重新登录获取');
        return null;
    }
    // 如果 token 有效，返回 token
    return token;
} 


export const setToken = (token) => {
    if (!token) {
        console.error('传入的token为空,无法保存');
        return;
    }

    // 存储 token 到 localStorage
    localStorage.setItem('token', token);
    console.log('token保存到本地存储成功');
}

export const getRefreshToken = () => {
    // 从 localStorage 获取 refreshToken
    const refreshToken = localStorage.getItem('refreshToken');
    
    // 如果 refreshToken 不存在，返回 null 或者提示用户登录
    if (!refreshToken) {
        console.warn('本地存储refreshToken不存在,请重新登录');
        return null;
    }
    // 如果 refreshToken 有效，返回 token
    return refreshToken;
}

export const setRefreshToken = (refreshToken) => {
    if (!refreshToken) {
        console.error('传入的refreshToken为空,无法保存');
        return;
    }

    // 存储 token 到 localStorage
    localStorage.setItem('refreshToken', refreshToken);
    console.log('refreshToken保存到本地存储成功');
}