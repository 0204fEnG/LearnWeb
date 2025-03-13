import instance from "../utils/request";
export const getHotSearch = () => instance.get('/circle/hot-search'); // 调用热搜接口


// api/circle.js
export const createCircle = (name, description, avatar) => {
  const formData = new FormData();
  formData.append('name', name);
  formData.append('description', description);
  if (avatar) {
    formData.append('avatar', avatar); // 添加头像文件
  }

  return instance.post('/circle/create', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
// 分页获取圈子列表（用于发布界面）
export const getCircleList = (params = {}) => {
  const { page = 1, limit = 10 } = params;
  return instance.get('/circle/', {
    params: {
      page,
      limit
    }
  });
};

// // 搜索圈子（用于搜索界面）
// export const searchCircles = (params = {}) => {
//   const { keyword, page = 1, limit = 10 } = params;
//   return instance.get('/circle/search', {
//     params: {
//       keyword,
//       page,
//       limit
//     }
//   });
// };

// 搜索圈子（用于搜索界面）
export const searchCircles = (params = {}) => {
  const { keyword, page = 1, limit = 10, sortType = 'postCount' } = params;
  return instance.get('/circle/search', {
    params: {
      keyword,
      page,
      limit,
      sortType // 传递排序类型
    }
  });
};