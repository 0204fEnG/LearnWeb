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