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

  // 获取帖子数据
  const getPostItems = useCallback(async () => {
    if (loadingRef.current || !hasMoreRef.current) return;

    setLoading(true);
    try {
      const { posts } = await getPostList({
        page: pageRef.current,
        limit: 10,
        sortBy: sortIndexRef.current === 0 ? 'replies' : 'createdAt',
        sortOrder: -1
      });

      // 更新帖子列表
      setPostItems((prev) =>
        pageRef.current === 1 ? posts : [...prev, ...posts]
      );

      // 更新是否有更多数据
      setHasMore(posts.length === 10); // 假设每页返回10条数据，如果少于10条则没有更多数据

      // 更新页码
      setPage((prev) => prev + 1);
    } catch (error) {
      console.error('获取帖子列表失败:', error);
    } finally {
      setLoading(false);
    }
  }, []);

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
            getPostItems();
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
  }, [getPostItems]);

  // 排序变化处理
  useEffect(() => {
    setPostItems([]);
    setPage(1);
    setHasMore(true);
  }, [sortIndex]);

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