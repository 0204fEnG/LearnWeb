import { useState, useEffect, useRef, useCallback } from 'react';
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
  const [sortIndex, setSortIndex] = useState(0);

  // 使用Ref同步最新状态
  const pageRef = useRef(page);
  const sortIndexRef = useRef(sortIndex);
  const loadingRef = useRef(loading);
  const hasMoreRef = useRef(hasMore);

  // 同步Ref与State
  useEffect(() => {
    pageRef.current = page;
    sortIndexRef.current = sortIndex;
    loadingRef.current = loading;
    hasMoreRef.current = hasMore;
  }, [page, sortIndex, loading, hasMore]);

  // 核心数据获取方法
  const fetchReplies = useCallback(
    async (targetPage, targetSort) => {
      if (loadingRef.current) return;

      setLoading(true);
      try {
        const res = await getReplies({
          postId,
          parentReply,
          page: targetPage,
          limit: 10,
          sort: targetSort === 0 ? 'likes' : 'time',
        });

        setReplies(prev => 
          targetPage === 1 ? res.comments : [...prev, ...res.comments]
        );
        setHasMore(res.comments.length === 10);
        setPage(targetPage + 1);
      } catch (error) {
        console.error('获取回复失败:', error);
      } finally {
        setLoading(false);
      }
    },
    [postId, parentReply]
  );

  // 处理排序变化
  useEffect(() => {
    setReplies([]);
    setPage(1);
    setHasMore(true);
    fetchReplies(1, sortIndex); // 主动加载第一页
  }, [sortIndex, fetchReplies]);

  // 无限滚动逻辑
  const sentinelRef = useRef(null);
  const observerRef = useRef(null);

  useEffect(() => {
    const handleIntersection = entries => {
      entries.forEach(entry => {
        if (
          entry.isIntersecting &&
          !loadingRef.current &&
          hasMoreRef.current
        ) {
          fetchReplies(pageRef.current, sortIndexRef.current);
        }
      });
    };

    observerRef.current = new IntersectionObserver(handleIntersection, {
      rootMargin: '50px'
    });

    if (sentinelRef.current) {
      observerRef.current.observe(sentinelRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [fetchReplies]);

  // 处理新回复
  const handleNewReply = newReply => {
    setReplyingToUser(null);
    setReplies(prev => [newReply, ...prev]);
  };

  // 排序选项
  const sortItems = [
    { name: '按热度', handleFunc: () => setSortIndex(0) },
    { name: '按时间', handleFunc: () => setSortIndex(1) }
  ];

  return (
    <div className="reply-modal" onClick={e => e.stopPropagation()}>
      <div className="modal-content">
        {/* 模态框头部 */}
        <div className="modal-header">
          <h3>评论详情</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        {/* 排序控件 */}
        <SortTop
          stickyTop="sort-sticky-top"
          sortIndex={sortIndex}
          sortItems={sortItems}
        />

        {/* 父级评论 */}
        <div className="parent-comment">
          <div className="first-level">
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

        {/* 回复列表 */}
        <div className="reply-list">
          {replies.map(reply => (
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

          {/* 滚动检测元素 */}
          <div ref={sentinelRef} className="sentinel" />

          {/* 加载状态 */}
          {loading && (
            <div className="scroll-loading">
              <Loading />
            </div>
          )}
          {!hasMore && <div className="no-more-data">已经到底啦~</div>}
        </div>

        {/* 评论输入框 */}
        <CommentInput
          inputPosition={{ position: 'absolute', bottom: '0px' }}
          postId={postId}
          parentReplyId={parentReply}
          onSuccess={handleNewReply}
          replyToUser={replyingToUser}
          onCancelReply={() => setReplyingToUser(null)}
        />
      </div>
    </div>
  );
};

export default ReplyModal;