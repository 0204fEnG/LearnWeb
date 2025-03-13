// SearchUser.jsx
import React, { useState, useEffect } from 'react';
import { searchUsers } from '../../../api/user';
import './SearchUser.scss';
import { useSearchParams } from 'react-router-dom';
import SortTop from '../../../components/SortTop/SortTop';
import Loading from '../../../components/Loading/Loading';
const SearchUser = () => {
  const [searchParams] = useSearchParams();
  const [users, setUsers] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [sortType, setSortType] = useState('fans');
const [sortIndex, setSortIndex] = useState(0);
  const sortItems = [
    {
      name: '按热度',
      handleFunc: () => {
        setSortType('fans')
      }
    }, {
      name: '按时间',
      handleFunc: () => {
        setSortType('createdAt')
      }
  }
  ]
    useEffect(() => {
      if (sortType === 'fans') {
        setSortIndex(0);
      } else if (sortType === 'createdAt') {
        setSortIndex(1);
      }
    }, [sortType]);
  const keyword = searchParams.get('q') || '';

  const fetchData = async (isNewSearch = false) => {
    if (!keyword || loading) return;

    try {
      setLoading(true);
      setError('');

      const response = await searchUsers({
        keyword,
        page: isNewSearch ? 1 : page,
        limit: 10,
        sortType
      });

        const newUsers = response.searchUsers;
        console.log(newUsers)
      setHasMore(response.hasMore);
      setUsers(prev => isNewSearch ? newUsers : [...prev, ...newUsers]);
      setPage(prev => isNewSearch ? 2 : prev + 1);
    } catch (err) {
      setError('搜索失败，请稍后重试');
      console.error('搜索错误:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!keyword) {
      setUsers([]);
      return;
    }
    
    const timer = setTimeout(() => {
      setPage(1);
      setUsers([]);
      fetchData(true);
    }, 300);

    return () => clearTimeout(timer);
  }, [keyword, sortType]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = document.documentElement.scrollHeight - 100;
      if (window.innerHeight + window.scrollY >= scrollThreshold && hasMore && !loading) {
        fetchData();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasMore, loading, page, keyword, sortType]);

  return (
    <div className="search-user-results">
      {error && <div className="error-message">{error}</div>}
<SortTop sortIndex={sortIndex} sortItems={sortItems} stickyTop='stickyTop'/>
      <div className="user-list">
        {users.length > 0 ||loading? (
          users.map(user => (
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

      {loading && (
        <div className="loading-indicator">
          <Loading/>
        </div>
      )}
    </div>
  );
};

export default SearchUser;