import instance from "../utils/request";
// api/user.js
export const searchUsers = (params = {}) => {
  const { keyword, page = 1, limit = 10, sortType = 'fans' } = params;
  return instance.get('/user/search', {
    params: {
      keyword,
      page,
      limit,
      sortType
    }
  });
};