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
  try {
    const response = await instance.get('/post/', {
      params: {
        page,
        limit,
        sortBy,
        sortOrder
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching post list:', error);
    throw error; // 如果需要处理错误，可以在这里抛出
  }
};