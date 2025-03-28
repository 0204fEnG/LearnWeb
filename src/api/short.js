import instance from "../utils/request";

export const uploadShort = (formData) => {
  return instance.post('/short/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};


export const getShortList = async ({ page, limit, sortBy, sortOrder }) => {
  return await instance.get('/short/', {
    params: {
      page,
      limit,
      sortBy,
      sortOrder
    }
  });
};