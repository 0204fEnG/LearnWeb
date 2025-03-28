import { useState, useEffect, useRef,useCallback } from 'react';
import { getReplies } from '../../../api/reply';
import './ReplyModal.scss';
import CommentInput from '../../CommentInput/CommentInput';
import SortTop from '../../SortTop/SortTop';
import Loading from '../../../components/Loading/Loading';

const ReplyModal = ({ postId, parentReply, onClose, selectedComment }) => {
  const [replies, setReplies] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [replyingToUser, setReplyingToUser] = useState(null);
  const [sortIndex, setSortIndex] = useState(0); // 0 热度 1 最新

  // 使用Ref解决闭包问题
  const pageRef = useRef(page);
  const sortIndexRef = useRef(sortIndex);
  const loadingRef = useRef(loading);
  const hasMoreRef = useRef(hasMore);

  // 观察器相关Ref
  const sentinelRef = useRef(null);
  const observerRef = useRef(null);
console.log(replies)
  // 同步Ref与State
  useEffect(() => {
    pageRef.current = page;
    sortIndexRef.current = sortIndex;
    loadingRef.current = loading;
    hasMoreRef.current = hasMore;
  }, [page, sortIndex, loading, hasMore]);

  // 获取回复
  const fetchReplies = useCallback(async () => {
    if (loadingRef.current || !hasMoreRef.current) return;

    setLoading(true);
    try {
      const res = await getReplies({
        postId,
        parentReply,
        page: pageRef.current,
        limit: 10,
        sort: sortIndexRef.current === 0 ? 'likes' : 'time',
      });

      // 如果 page 为 1，替换数据；否则追加数据
      setReplies((prev) =>
        pageRef.current === 1 ? res.comments : [...prev, ...res.comments]
      );

      // 更新是否有更多数据
      setHasMore(res.comments.length === 10); // 假设每页返回10条数据，如果少于10条则没有更多数据

      // 更新页码
      setPage((prev) => prev + 1);
    } catch (error) {
      console.error('获取回复失败:', error);
    } finally {
      setLoading(false);
    }
  }, [postId, parentReply]);

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
            fetchReplies();
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
  }, [fetchReplies]);

  // 排序变化处理
  useEffect(() => {
    setReplies([]);
    setPage(1);
    setHasMore(true);
    fetchReplies()
  }, [sortIndex]);

  // 处理新回复成功
  const handleNewReply = (newReply) => {
    setReplyingToUser(null);
    setReplies((prev) => [newReply, ...prev]);
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
    <div className="reply-modal">
      <div className="modal-content">
        <SortTop
          stickyTop="sort-sticky-top"
          sortIndex={sortIndex}
          sortItems={sortItems}
        />
        <div className="modal-header">
          <h3>全部回复</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        <div className="parent-comment">
          <div className="first-level">
            {/* 一级评论主体 */}
            <div className="comment-main">
              <img
                src={selectedComment.user?.avatar}
                alt="头像"
                className="avatar"
              />
              <div className="content">
                <div className="user-info">
                  <span className="username">{selectedComment.user?.username}</span>
                  <span className="time">
                    {new Date(selectedComment.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text">{selectedComment.content}</p>
                <div className="actions">
                  <button className="like-btn">{selectedComment.likes} 赞</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 添加评论输入框 */}
        <CommentInput
          inputPosition={'reply-input'}
          postId={postId}
          parentReplyId={parentReply}
          onSuccess={handleNewReply}
          replyToUser={replyingToUser}
          onCancelReply={() => setReplyingToUser(null)}
        />

        <div className="reply-list">
          {replies.map((reply) => (
            <div
              key={'second' + reply._id}
              className="reply-item"
              onClick={() =>
                setReplyingToUser({
                  username: reply.user?.username,
                  id: reply.user._id,
                })
              }
            >
              <img
                src={reply.user?.avatar}
                alt="头像"
                className="avatar"
              />
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
        </div>

        {/* 哨兵元素，用于触发加载 */}
        <div ref={sentinelRef} className="sentinel" />

        {/* 加载状态指示器 */}
        {loading && <div className="scroll-loading"><Loading /></div>}
        {!hasMore && <div className="no-more-data">已经到底啦~</div>}
      </div>
    </div>
  );
};

export default ReplyModal;