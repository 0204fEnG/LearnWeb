// api/comment.js
import instance from '../utils/request';

export const getReplies = async (params) => {
  return instance.get('/reply', {
    params: {
      postId: params.postId,
      parentReply: params.parentReply,
      page: params.page,
      limit: params.limit,
      sort:params.sort
    }
  });
};

export const postReply = async (data) => {
  return instance.post('/reply', {
    postId: data.postId,
    content: data.content,
    parentReplyId: data.parentReplyId,
    replyToUserId: data.replyToUserId
  });
};