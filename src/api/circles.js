import request from "../utils/request";
export const getHotSearch = () => request.get('/circles/hot-search'); // 调用热搜接口