import instance from "../utils/request";
export const getHotSearch = () => instance.get('/circle/hot-search'); // 调用热搜接口


// 创建圈子
export const createCircle = (name, description, avatar) => {
  const formData = new FormData();
  formData.append('name', name);
  formData.append('description', description);
  // 假设 creator ID 是从本地存储或上下文中获取的
  formData.append('creator', '64abc12345def67890abc123'); 
  if (avatar) {
    formData.append('avatar', avatar);
  }

  return instance.post('/circle/create', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};


export const getCircles = (page = 1, limit = 10) => {
    return instance.get('circle/', {
        params: {
            page: page,
            limit: limit
        }
    });
};