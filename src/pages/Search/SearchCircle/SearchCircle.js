import React, { useState, useEffect } from 'react';
import { searchCircles } from '../../../api/circle';
import './SearchCircle.scss';

const SearchCircle = ({ searchParams }) => {
  const [circles, setCircles] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [sortType, setSortType] = useState('postCount'); // 默认按热度排序

  const keyword = searchParams.get('q') || '';

  // 主要数据获取逻辑
  const fetchData = async (isNewSearch = false) => {
    if (!keyword || loading) return;

    try {
      setLoading(true);
      setError('');

      const response = await searchCircles({
        keyword,
        page: isNewSearch ? 1 : page,
        limit: 10,
        sortType: sortType // 传递排序类型
      });

      const newCircles = response.searchCircles;
      console.log(newCircles);
      setHasMore(newCircles.length >= 10);
      setCircles(prev => isNewSearch ? newCircles : [...prev, ...newCircles]);
      setPage(prev => isNewSearch ? 2 : prev + 1);
    } catch (err) {
      setError('搜索失败，请稍后重试');
      console.error('搜索错误:', err);
    } finally {
      setLoading(false);
    }
  };

  // 当搜索关键词或排序类型变化时重置
  useEffect(() => {
    if (!keyword) {
      setCircles([]);
      return;
    }
    
    const timer = setTimeout(() => {
      setPage(1);
      setCircles([]);
      fetchData(true);
    }, 300);

    return () => clearTimeout(timer);
  }, [keyword, sortType]); // 添加 sortType 到依赖数组

  // 滚动加载更多
  useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = document.documentElement.scrollHeight - 100;
      if (
        window.innerHeight + window.scrollY >= scrollThreshold &&
        hasMore &&
        !loading
      ) {
        fetchData();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasMore, loading, page, keyword, sortType]); // 添加 sortType 到依赖数组

  return (
    <div className="search-circle-results">
      {error && <div className="error-message">{error}</div>}

      <div className="search-header">
        <select 
          value={sortType} 
          onChange={(e) => setSortType(e.target.value)}
          className="sort-selector"
        >
          <option value="postCount">按热度排序</option>
          <option value="createdAt">按时间排序</option>
        </select>
      </div>

      <div className="circle-list">
        {circles.length > 0 ? (
          circles.map(circle => (
            <div key={circle._id} className="circle-card">
              <img 
                src={circle.avatar || '/default-circle.png'} 
                alt={circle.name}
                className="circle-avatar"
              />
              <div className="circle-info">
                <h3>{circle.name}</h3>
                <p className="description">{circle.description}</p>
                <div className="stats">
                  <span>👥 {circle.memberCount}</span>
                  <span>📝 {circle.postCount}</span>
                  <span>📅 {circle.createdAt}</span>
                </div>
                {/* 创建者信息 */}
                {circle.creator && (
                  <div className="creator-info">
                    <img 
                      src={circle.creator.avatar || '/default-user.png'} 
                      alt={circle.creator.username}
                      className="creator-avatar"
                    />
                    <span>{circle.creator.username}</span>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          keyword && !loading && <div className="no-results">暂无相关圈子</div>
        )}
      </div>

      {loading && (
        <div className="loading-indicator">
          <div className="spinner"></div>
          {circles.length > 0 ? '加载更多...' : '搜索中...'}
        </div>
      )}
    </div>
  );
};

export default SearchCircle;