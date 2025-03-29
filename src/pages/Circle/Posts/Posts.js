import { useState, useEffect, useRef, useCallback } from 'react';
import { Outlet, useOutletContext } from 'react-router-dom';
import LayoutContainer from '../../../components/ContentCard/LayoutContainer/LayoutContainer';
import SortTop from '../../../components/SortTop/SortTop';
import { getCirclePosts } from '../../../api/post';
import './Posts.scss';
import Loading from '../../../components/Loading/Loading';

const CirclePosts = () => {
  // 状态管理
  const circleId = useOutletContext();
  const [sortIndex, setSortIndex] = useState(0); // 0 热度 1 最新
  const [postItems, setPostItems] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  // 使用 Ref 解决闭包问题
  const pageRef = useRef(page);
  const sortIndexRef = useRef(sortIndex);
  const loadingRef = useRef(loading);
  const hasMoreRef = useRef(hasMore);
  const circleIdRef = useRef(circleId);

  // 同步 Ref 与 State
  useEffect(() => {
    pageRef.current = page;
    sortIndexRef.current = sortIndex;
    loadingRef.current = loading;
    hasMoreRef.current = hasMore;
    circleIdRef.current = circleId;
  }, [page, sortIndex, loading, hasMore, circleId]);

  // 核心数据获取方法
  const fetchPosts = useCallback(async (targetPage = pageRef.current, targetSort = sortIndexRef.current) => {
    if (loadingRef.current || !hasMoreRef.current || !circleIdRef.current) return;

    setLoading(true);
    try {
      // 根据 sortIndex 动态设置排序字段
      const sortBy = targetSort === 0 ? 'replies' : 'createdAt';
      const sortOrder = -1; // 默认降序

      const { posts } = await getCirclePosts({
        circleId: circleIdRef.current,
        page: targetPage,
        limit: 10,
        sortBy,
        sortOrder
      });

      setPostItems(prev => 
        targetPage === 1 ? posts : [...prev, ...posts]
      );
      setHasMore(posts.length >= 10);
      setPage(prev => targetPage === 1 ? 2 : prev + 1);
    } catch (error) {
      console.error('获取帖子列表失败:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // 处理排序变化 - 使用独立函数确保正确时序
  const handleSortChange = useCallback(() => {
    setPostItems([]);
    setPage(1);
    setHasMore(true);
    // 直接调用fetchPosts，不使用setTimeout
    fetchPosts(1, sortIndexRef.current);
  }, [fetchPosts]);

  // 处理 circleId 变化 - 同样使用独立函数
  const handleCircleChange = useCallback(() => {
    setPostItems([]);
    setPage(1);
    setHasMore(true);
    fetchPosts(1, sortIndexRef.current);
  }, [fetchPosts]);

  // 监听排序变化
  useEffect(() => {
    handleSortChange();
  }, [sortIndex, handleSortChange]);

  // 监听 circleId 变化
  useEffect(() => {
    handleCircleChange();
  }, [circleId, handleCircleChange]);

  // 无限滚动逻辑
  const sentinelRef = useRef(null);
  const observerRef = useRef(null);

  useEffect(() => {
    const handleIntersection = entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !loadingRef.current && hasMoreRef.current) {
          fetchPosts();
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
  }, [fetchPosts]);

  // 排序选项
  const sortItems = [
    { name: '按热度', handleFunc: () => setSortIndex(0) },
    { name: '按时间', handleFunc: () => setSortIndex(1) }
  ];

  return (
    <div className="circle-posts-container">
      <SortTop 
        sortIndex={sortIndex} 
        sortItems={sortItems} 
        stickyTop="post-sticky-top"
      />

      <main className="circle-posts-main">
        <LayoutContainer items={postItems} />

        {/* 哨兵元素，用于触发加载 */}
        <div ref={sentinelRef} className="sentinel" />

        {/* 加载状态指示器 */}
        {loading && <div className="scroll-loading"><Loading /></div>}
        {!hasMore && postItems.length > 0 && (
          <div className="no-more-data">已经到底啦~</div>
        )}
      </main>

      <Outlet />
    </div>
  );
};

export default CirclePosts;