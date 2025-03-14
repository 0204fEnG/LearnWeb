import React, { useState, useEffect, useRef, useCallback } from 'react';
import { searchCircles } from '../../../api/circle';
import './SearchCircle.scss';
import SortTop from '../../../components/SortTop/SortTop';
import Loading from '../../../components/Loading/Loading';
import { formatPublishTime } from '../../../utils/time/formatPublishTime';
const SearchCircle = ({ keyword }) => {
  // 状态管理
  const [circles, setCircles] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [sortType, setSortType] = useState('postCount');
  // 使用Ref解决闭包问题
  const pageRef = useRef(page);
  const sortTypeRef = useRef(sortType);
  const loadingRef = useRef(loading);
  const hasMoreRef = useRef(hasMore);
  const keywordRef = useRef(keyword);

  // 观察器相关Ref
  const sentinelRef = useRef(null);
  const observerRef = useRef(null);

  // 同步Ref与State
  useEffect(() => {
    pageRef.current = page;
    sortTypeRef.current = sortType;
    loadingRef.current = loading;
    hasMoreRef.current = hasMore;
    keywordRef.current = keyword;
  }, [page, sortType, loading, hasMore, keyword]);

  // 数据获取逻辑
  const fetchData = useCallback(async () => {
    if (loadingRef.current || !hasMoreRef.current || !keywordRef.current) return;

    try {
      setLoading(true);
      setError('');

      const response = await searchCircles({
        keyword: keywordRef.current,
        page: pageRef.current,
        limit: 10,
        sortType: sortTypeRef.current
      });

      const newCircles = response.searchCircles;
      setCircles(prev => 
        pageRef.current === 1 ? newCircles : [...prev, ...newCircles]
      );
      setHasMore(newCircles.length >= 10);
      setPage(prev => prev + 1);
    } catch (err) {
      setError('搜索失败，请稍后重试');
      console.error('搜索错误:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // 初始化IntersectionObserver
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !loadingRef.current && hasMoreRef.current) {
            fetchData();
          }
        });
      },
      { rootMargin: '100px' }
    );

    if (sentinelRef.current) {
      observerRef.current.observe(sentinelRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [fetchData]);
  // 处理搜索条件变化
  useEffect(() => {
      if (!keyword) {
        setCircles([]);
        return;
      }

      // 重置状态并重新加载
      setCircles([]);
      setPage(1);
      setHasMore(true);
  }, [keyword, sortType,fetchData]);

  // 排序配置
  const sortItems = [
    {
      name: '按热度',
      handleFunc: () => setSortType('postCount')
    }, {
      name: '按时间',
      handleFunc: () => setSortType('createdAt')
    }
  ];

  const sortIndex = sortType === 'postCount' ? 0 : 1;

  return (
    <div className="search-circle-results">
      {error && <div className="error-message">{error}</div>}
      
      <SortTop sortIndex={sortIndex} sortItems={sortItems} stickyTop='stickyTop'/>

      <div className="circle-list">
        {circles.length > 0 ? (
          circles.map(circle => (
            // 保持原有渲染逻辑
            <div key={circle._id} className="circle-card">
                <div className="circle-avatar-wrapper">
              <img 
                src={circle.avatar || '/default-circle.png'} 
                alt={circle.name}
                className="circle-avatar"
                />
              </div>
              <div className="circle-info">
                <h3>{circle.name}</h3>
                <p className="description">{circle.description}</p>
                {/* 创建者信息 */}
                {circle.creator && (
                  <div className="creator-info">
                    <img 
                      src={circle.creator.avatar || '/default-user.png'} 
                      alt={circle.creator.username}
                      className="creator-avatar"
                    />
                    <span className='creator-name'>由{circle.creator.username}创建</span>
                  </div>
                )}
                      <div className="stats">
                  <span>👥成员数: {circle.memberCount}</span>
                  <span>📝帖子数:{circle.postCount}</span>
                  <span>📅创建时间:{formatPublishTime(circle.createdAt)}</span>
                </div>
                </div>
            </div>
          ))
        ) : (
          keyword && !loading && <div className="no-results">暂无相关圈子</div>
        )}
      </div>

      {/* 哨兵元素 */}
      <div ref={sentinelRef} className="sentinel" />

      {loading && (
        <div className="loading-indicator">
          <Loading />
        </div>
      )}
      
      {!hasMore && circles.length > 0 && (
        <div className="no-more-data">已经到底啦~</div>
      )}
    </div>
  );
};

export default SearchCircle;
