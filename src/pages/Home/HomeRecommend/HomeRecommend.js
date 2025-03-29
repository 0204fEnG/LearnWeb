import { useCallback, useEffect, useRef, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Banner from '../../../components/Banner/Banner';
import SingleLineDisplayBar from '../../../components/HorizontalDisplayBar/SingleLineDisplayBar/SingleLineDisplayBar';
import LayoutContainer from '../../../components/ContentCard/LayoutContainer/LayoutContainer';
import SortTop from '../../../components/SortTop/SortTop';
import { getPostList } from '../../../api/post';
import './HomeRecommend.scss';
import Loading from '../../../components/Loading/Loading';

const HomeRecommend = () => {
  // 状态管理
  const [sortIndex, setSortIndex] = useState(0);
  const [postItems, setPostItems] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

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
  const getPostItems = useCallback(
    async (targetPage, targetSort) => {
      if (loadingRef.current) return;

      setLoading(true);
      try {
        const { posts } = await getPostList({
          page: targetPage,
          limit: 10,
          sortBy: targetSort === 0 ? 'replies' : 'createdAt',
          sortOrder: -1
        });

        setPostItems(prev => 
          targetPage === 1 ? posts : [...prev, ...posts]
        );
        setHasMore(posts.length === 10);
        setPage(targetPage + 1);
      } catch (error) {
        console.error('获取帖子列表失败:', error);
      } finally {
        setLoading(false);
      }
    },
    [] // 保持依赖数组为空，通过参数传递最新值
  );

  // 处理排序变化
  useEffect(() => {
    setPostItems([]);
    setPage(1);
    setHasMore(true);
    getPostItems(1, sortIndex); // 主动加载第一页数据
  }, [sortIndex, getPostItems]);

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
          getPostItems(pageRef.current, sortIndexRef.current);
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
  }, [getPostItems]);

  // 静态数据
  const bannerImages = Array(5)
    .fill()
    .map((_, i) => `/images/header/banner/banner${i + 1}.png`);

  const quickLinks = [
    { name: '话题讨论', imgUrl: '/images/header/banner/icon_popular.png' },
    { name: '入站必看', imgUrl: '/images/header/banner/icon_weekly.png' },
    { name: '热贴榜单', imgUrl: '/images/header/banner/icon_rank.png' },
    { name: '猜你想看', imgUrl: '/images/header/banner/icon_history.png' },
    { name: '放松一下', imgUrl: '/images/header/banner/icon_music.png' }
  ];

  const sortOptions = [
    { name: '按热度', handleFunc: () => setSortIndex(0) },
    { name: '按时间', handleFunc: () => setSortIndex(1) }
  ];

  return (
    <div className="home-recommend">
      <header className="home-recommend__header">
        <Banner bannerType={2} bannerData={bannerImages} />
        <SingleLineDisplayBar displayItems={quickLinks} />
      </header>

      <SortTop sortIndex={sortIndex} sortItems={sortOptions} />

      <main className="home-recommend__main">
        <LayoutContainer items={postItems} />

        {/* 哨兵元素，用于触发加载 */}
        <div ref={sentinelRef} className="sentinel" />

        {/* 加载状态指示器 */}
        {loading && <div className="scroll-loading"><Loading/></div>}
        {!hasMore && <div className="no-more-data">已经到底啦~</div>}
      </main>

      <Outlet />
    </div>
  );
};

export default HomeRecommend;