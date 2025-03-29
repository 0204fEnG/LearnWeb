import React, { useState, useEffect, useRef, useCallback } from 'react';
import { searchUsers } from '../../../api/user';
import './SearchUser.scss';
import SortTop from '../../../components/SortTop/SortTop';
import Loading from '../../../components/Loading/Loading';

const SearchUser = ({ keyword }) => {
// 状态管理
  const [users, setUsers] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [sortType, setSortType] = useState('fans');
  // 使用Ref解决闭包问题
  const pageRef = useRef(page);
  const sortTypeRef = useRef(sortType);
  const loadingRef = useRef(loading);
  const hasMoreRef = useRef(hasMore);
  const keywordRef = useRef(keyword);

  // 观察器相关Ref
  const sentinelRef = useRef(null);
  const observerRef = useRef(null);


  // 核心数据获取方法修改
  const fetchData = useCallback(
    async (targetPage, targetSort) => {
      if (loadingRef.current || !keywordRef.current) return;

      try {
        setLoading(true);
        setError('');

        const response = await searchUsers({
          keyword: keywordRef.current,
          page: targetPage,
          limit: 10,
          sortType: targetSort
        });

        const newUsers = response.searchUsers;
        setUsers(prev => 
          targetPage === 1 ? newUsers : [...prev, ...newUsers]
        );
        setHasMore(response.hasMore);
        setPage(targetPage + 1);
      } catch (err) {
        setError('搜索失败，请稍后重试');
        console.error('搜索错误:', err);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // 处理搜索条件变化
  useEffect(() => {
    if (!keyword) {
      setUsers([]);
      return;
    }

    setUsers([]);
    setPage(1);
    setHasMore(true);
    fetchData(1, sortType);
  }, [keyword, sortType, fetchData]);
  // 同步Ref与State
  useEffect(() => {
    pageRef.current = page;
    sortTypeRef.current = sortType;
    loadingRef.current = loading;
    hasMoreRef.current = hasMore;
    keywordRef.current = keyword;
  }, [page, sortType, loading, hasMore, keyword]);


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

  // 排序配置
  const sortItems = [
    { name: '按热度', handleFunc: () => setSortType('fans') },
    { name: '按时间', handleFunc: () => setSortType('createdAt') }
  ];
  const sortIndex = sortType === 'fans' ? 0 : 1;

  return (
    <div className="search-user-results">
      {error && <div className="error-message">{error}</div>}

      <SortTop sortIndex={sortIndex} sortItems={sortItems} stickyTop='stickyTop'/>

      <div className="user-list">
        {users.length > 0 ? (
          users.map(user => (
            // 保持原有渲染逻辑
            <div key={user._id} className="user-card">
              <div className="user-info">
                <img 
                  src={user.avatar || '/default-user.png'} 
                  alt={user.username}
                  className="user-avatar"
                />
                <div className="user-details">
                  <h3 className='user-name'>{user.username}</h3>
                  <p className="bio">{user.bio}</p>
                  <div className="stats">
                    <span>粉丝: {user.followersCount}</span>
                    <span>帖子: {user.postsCount}</span>
                    <span>注册于: {user.createdAt}</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          keyword && !loading && <div className="no-results">暂无相关用户</div>
        )}
      </div>

      {/* 哨兵元素 */}
      <div ref={sentinelRef} className="sentinel" />

      {loading && (
        <div className="loading-indicator">
          <Loading/>
        </div>
      )}
      
      {!hasMore && users.length > 0 && (
        <div className="no-more-data">已经到底啦~</div>
      )}
    </div>
  );
};

export default SearchUser;