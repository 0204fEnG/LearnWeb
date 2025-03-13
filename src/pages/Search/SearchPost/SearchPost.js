import React, { useState, useEffect } from 'react';
import { searchPosts } from '../../../api/post'; // 假设您已经有一个搜索帖子的 API
import './SearchPost.scss';
import { useSearchParams } from 'react-router-dom';

const SearchPost = () => {
  const [searchParams] = useSearchParams();
  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
const [sortType, setSortType] = useState('replies'); // 初始值改为replies

  const keyword = searchParams.get('q') || '';

  // 主要数据获取逻辑
  const fetchData = async (isNewSearch = false) => {
    if (!keyword || loading) return;

    try {
      setLoading(true);
      setError('');

      const response = await searchPosts({
        keyword,
        page: isNewSearch ? 1 : page,
        limit: 10,
        sortType: sortType // 传递排序类型
      });

      const newPosts = response.searchPosts;
      console.log(newPosts);
      setHasMore(newPosts.length >= 10);
      setPosts(prev => isNewSearch ? newPosts : [...prev, ...newPosts]);
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
      setPosts([]);
      return;
    }
    
    const timer = setTimeout(() => {
      setPage(1);
      setPosts([]);
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
    <div className="search-post-results">
      {error && <div className="error-message">{error}</div>}

      <div className="search-header">
<select 
  value={sortType} 
  onChange={(e) => setSortType(e.target.value)}
  className="sort-selector"
>
  <option value="replies">按热度排序</option>
  <option value="createdAt">按时间排序</option>
</select>
      </div>

      <div className="post-list">
        {posts.length > 0 ? (
          posts.map(post => (
            <div key={post._id} className="post-card">
              <div className="post-header">
                <img 
                  src={post.author.avatar || '/default-user.png'} 
                  alt={post.author.username}
                  className="creator-avatar"
                />
                <span className="creator-name">{post.author.username}</span>
              </div>
              <div className="post-content">
                <h3 className="post-title">{post.title}</h3>
                <p className="post-description">{post.content}</p>
              </div>
              <div className="post-stats">
                <span>👍 {post.likeCount}</span>
                <span>💬 {post.commentCount}</span>
                <span>📅 {post.createdAt}</span>
              </div>
            </div>
          ))
        ) : (
          keyword && !loading && <div className="no-results">暂无相关帖子</div>
        )}
      </div>

      {loading && (
        <div className="loading-indicator">
          <div className="spinner"></div>
          {posts.length > 0 ? '加载更多...' : '搜索中...'}
        </div>
      )}
    </div>
  );
};

export default SearchPost;