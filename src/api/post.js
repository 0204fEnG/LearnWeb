// api/post.js
import instance from "../utils/request";

export const createPost = (data) => {
  return instance.post('/post/', data, {
    headers: {
      'Content-Type': 'multipart/form-data' // 设置请求头为 multipart/form-data
    }
  });
};

export const getPostList = async ({ page, limit, sortBy, sortOrder }) => {
   return  await instance.get('/post/', {
      params: {
        page,
        limit,
        sortBy,
        sortOrder
      }
    });
};

export const getPost = async (postId) => {
  return await instance.get(`/post/${postId}`);
};


// 搜索帖子（用于搜索界面）
// 修改api/post.js中的searchPosts函数
export const searchPosts = (params = {}) => {
  const { keyword, page = 1, limit = 10, sortType = 'replies' } = params;
  return instance.get('/post/search', {
    params: {
      keyword,
      page,
      limit,
      sortBy: sortType,  // 修正参数名
      sortOrder: -1       // 默认降序
    }
  });
};

// 新增获取圈子帖子的API
export const getCirclePosts = async ({ circleId, page = 1, limit = 10, sortIndex = 0 }) => {
  return instance.get(`/post/circle/${circleId}`, {
    params: {
      page,
      limit,
      sortIndex // 0表示按热度，1表示按时间
    }
  });
};