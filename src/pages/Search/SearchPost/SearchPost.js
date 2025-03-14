import React, { useState, useEffect } from 'react';
import { searchPosts } from '../../../api/post'; // 假设您已经有一个搜索帖子的 API
import './SearchPost.scss';
import { useNavigate, useSearchParams } from 'react-router-dom';
import SortTop from '../../../components/SortTop/SortTop';
import Loading from '../../../components/Loading/Loading';
import { formatPublishTime } from '../../../utils/time/formatPublishTime';
const SearchPost = () => {
  const [searchParams] = useSearchParams();
  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const nav=useNavigate()
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
const [sortType, setSortType] = useState('replies'); // 初始值改为replies
  const [sortIndex, setSortIndex] = useState(0);
  const sortItems = [
    {
      name: '按热度',
      handleFunc: () => {
        setSortType('replies')
      }
    }, {
      name: '按时间',
      handleFunc: () => {
        setSortType('createdAt')
      }
  }
  ]
    useEffect(() => {
      if (sortType === 'replies') {
        setSortIndex(0);
      } else if (sortType === 'createdAt') {
        setSortIndex(1);
      }
    }, [sortType]);
  const keyword = searchParams.get('q') || '';
  const handlePostClick = (postId) => {
    nav(`post/${postId}`);
  };
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

<SortTop sortIndex={sortIndex} sortItems={sortItems} stickyTop='stickyTop'/>

      <div className="post-list">
        {posts.length > 0||loading ? (
          posts.map(post => (
            <div key={post._id} className="post-card" onClick={(e) => {
              e.stopPropagation()
              handlePostClick(post._id)
            }}>
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
                <span>👍 {post.likes}</span>
                <span>💬 {post.replies}</span>
                <span>📅 {formatPublishTime(post.createdAt)}</span>
              </div>
            </div>
          ))
        ) : (
          keyword && !loading && <div className="no-results">暂无相关帖子</div>
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

export default SearchPost;