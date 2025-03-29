import { useState, useEffect, useCallback, useRef } from 'react';
import { getReplies } from '../../api/reply';
import ReplyModal from './ReplyModal/ReplyModal';
import './Comment.scss';
import CommentInput from '../CommentInput/CommentInput';
import SortTop from '../SortTop/SortTop';
import Loading from '../../components/Loading/Loading';
import { formatPublishTime } from '../../utils/time/formatPublishTime';

const Comment = ({ postId,commentHeaderTop }) => {
  const [comments, setComments] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [repliesMap, setRepliesMap] = useState({});
  const [selectedComment, setSelectedComment] = useState(null);
  const [replyingToComment, setReplyingToComment] = useState(null);
  const [sortIndex, setSortIndex] = useState(0); // 0 热度 1 最新

  // 使用Ref解决闭包问题
  const pageRef = useRef(page);
  const sortIndexRef = useRef(sortIndex);
  const loadingRef = useRef(loading);
  const hasMoreRef = useRef(hasMore);

  // 观察器相关Ref
  const sentinelRef = useRef(null);
  const observerRef = useRef(null);

  // 同步Ref与State
  useEffect(() => {
    pageRef.current = page;
    sortIndexRef.current = sortIndex;
    loadingRef.current = loading;
    hasMoreRef.current = hasMore;
  }, [page, sortIndex, loading, hasMore]);

  // 获取一级评论
  const fetchComments = useCallback(async () => {
    if (loadingRef.current || !hasMoreRef.current) return;

    setLoading(true);
    try {
      const res = await getReplies({
        postId,
        page: pageRef.current,
        limit: 10,
        sort: sortIndexRef.current === 0 ? 'likes' : 'time',
      });

      // 如果 page 为 1，替换数据；否则追加数据
      setComments((prev) =>
        pageRef.current === 1 ? res.comments : [...prev, ...res.comments]
      );

      // 更新是否有更多数据
      setHasMore(res.comments.length === 10); // 假设每页返回10条数据，如果少于10条则没有更多数据

      // 获取每个一级评论的热门回复
      res.comments.forEach((comment) => {
        // 检查是否已经获取过热门回复
        if (!repliesMap[comment._id]) {
          fetchTopReplies(comment._id);
        }
      });

      // 更新页码
      setPage((prev) => prev + 1);
    } catch (error) {
      console.error('获取评论失败:', error);
    } finally {
      setLoading(false);
    }
  }, [postId, repliesMap]);

  // 获取热门二级评论
  const fetchTopReplies = async (parentId) => {
    try {
      const res = await getReplies({
        postId,
        parentReply: parentId,
        sort: 'likes',
      });

      const top3Comments = res.comments
        .sort((a, b) => b.likes - a.likes) // 按点赞数从高到低排序
        .slice(0, 3); // 取前3条评论

      // 更新热门二级评论
      setRepliesMap((prev) => ({
        ...prev,
        [parentId]: {
          topReplies: top3Comments,
          total: res.comments.length,
        },
      }));
    } catch (error) {
      console.error('获取回复失败:', error);
    }
  };

  // 初始化IntersectionObserver
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (
            entry.isIntersecting &&
            !loadingRef.current &&
            hasMoreRef.current
          ) {
            fetchComments();
          }
        });
      },
      { rootMargin: '50px' } // 提前加载的缓冲距离
    );

    // 观察哨兵元素
    if (sentinelRef.current) {
      observerRef.current.observe(sentinelRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [fetchComments]);

  // 排序变化处理
  useEffect(() => {
    setComments([]);
    setPage(1);
    setHasMore(true);
    setRepliesMap({}); // 清空热门二级评论缓存
  }, [sortIndex]);

  // 处理新评论成功的回调
  const handleNewComment = (newComment) => {
    setReplyingToComment(null);
    if (!newComment.parentReply) {
      // 添加新一级评论
      setComments((prev) => [newComment, ...prev]);
    } else {
      // 更新二级评论
      setRepliesMap((prev) => {
        const parentId = newComment.parentReply;
        const prevData = prev[parentId] || { topReplies: [], total: 0 };

        return {
          ...prev,
          [parentId]: {
            topReplies: [newComment, ...prevData.topReplies],
            total: prevData.total + 1,
          },
        };
      });
    }
  };

  // 排序选项
  const sortItems = [
    {
      name: '按热度',
      handleFunc: () => setSortIndex(0),
    },
    {
      name: '按时间',
      handleFunc: () => setSortIndex(1),
    },
  ];

  return (
    <div className="comment-container">
<div className="comment-header-top"  style={commentHeaderTop}>
      <SortTop
        sortIndex={sortIndex}
        sortItems={sortItems}
      />
        <CommentInput
        postId={postId}
        onSuccess={handleNewComment}
        parentReplyId={replyingToComment?.commentId}
        replyToUser={replyingToComment?.reply}
        onCancelReply={() => setReplyingToComment(null)}
        />
      </div>
      <div className="comment-list">
        {comments.map((comment) => (
          <div key={'first' + comment._id} className="first-level">
            {/* 一级评论主体 */}
            <div
              className="comment-main"
              onClick={() =>
                setReplyingToComment({
                  commentId: comment._id,
                  reply: {
                    username: comment.user?.username,
                    id: null,
                  },
                })
              }
            >
              <img src={comment.user?.avatar} alt="头像" className="avatar" />
              <div className="content">
                <div className="user-info">
                  <span className="username">{comment.user?.username}</span>
                  <span className="time">
                    {formatPublishTime(comment.createdAt)}
                  </span>
                </div>
                <p className="text">{comment.content}</p>
                <div className="actions">
                  <button className="like-btn">{comment.likes} 赞</button>
                </div>
              </div>
            </div>

            {/* 二级评论列表 */}
            {repliesMap[comment._id]?.topReplies?.length > 0 && (
              <div className="second-level">
                {repliesMap[comment._id].topReplies.map((reply) => (
                  <div
                    key={'top' + reply._id}
                    className="reply-item"
                    onClick={() =>
                      setReplyingToComment({
                        commentId: comment._id,
                        reply: {
                          username: reply.user?.username,
                          id: reply.user?._id,
                        },
                      })
                    }
                  >
                    <img src={reply.user?.avatar} alt="头像" className="avatar" />
                    <div className="content">
                      <div className="user-info">
                        <span className="username">{reply.user?.username}</span>
                        {reply.replyToUser && (
                          <>
                            <span className="reply-text">回复</span>
                            <span className="reply-user">
                              @{reply.replyToUser?.username}
                            </span>
                          </>
                        )}
                      </div>
                      <p className="text">{reply.content}</p>
                      <div className="actions">
                        <button className="like-btn">{reply.likes} 赞</button>
                      </div>
                    </div>
                  </div>
                ))}

                {/* 查看更多按钮 */}
                {repliesMap[comment._id]?.total >= 3 && (
                  <button
                    className="view-more"
                    onClick={() => setSelectedComment(comment)}
                  >
                    查看全部{repliesMap[comment._id].total}条回复
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 哨兵元素，用于触发加载 */}
      <div ref={sentinelRef} className="sentinel" />

      {/* 加载状态指示器 */}
      {loading && <div className="scroll-loading"><Loading /></div>}
      {!hasMore && <div className="no-more-data">已经到底啦~</div>}

      {/* 二级评论弹窗 */}
      {selectedComment && (
        <ReplyModal
          postId={postId}
          parentReply={selectedComment._id}
          selectedComment={selectedComment}
          onClose={() => setSelectedComment(null)}
        />
          )}
    </div>
  );
};

export default Comment;