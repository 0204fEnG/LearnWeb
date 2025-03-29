// import React, { useState, useEffect, useRef, useCallback } from 'react';
// import { searchPosts } from '../../../api/post';
// import './SearchPost.scss';
// import { useNavigate } from 'react-router-dom';
// import SortTop from '../../../components/SortTop/SortTop';
// import Loading from '../../../components/Loading/Loading';
// import { formatPublishTime } from '../../../utils/time/formatPublishTime';

// const SearchPost = ({ keyword }) => {
//   // 状态管理
//   const [posts, setPosts] = useState([]);
//   const [hasMore, setHasMore] = useState(true);
//   const [page, setPage] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [sortType, setSortType] = useState('replies');

//   // 使用Ref解决闭包问题
//   const pageRef = useRef(page);
//   const sortTypeRef = useRef(sortType);
//   const loadingRef = useRef(loading);
//   const hasMoreRef = useRef(hasMore);
//   const keywordRef = useRef(keyword);

//   // 观察器相关Ref
//   const sentinelRef = useRef(null);
//   const observerRef = useRef(null);
//   const nav = useNavigate();

//   // 同步Ref与State
//   useEffect(() => {
//     pageRef.current = page;
//     sortTypeRef.current = sortType;
//     loadingRef.current = loading;
//     hasMoreRef.current = hasMore;
//     keywordRef.current = keyword;
//   }, [page, sortType, loading, hasMore, keyword]);

//   // 数据获取逻辑
//   const fetchData = useCallback(async () => {
//     if (loadingRef.current || !hasMoreRef.current || !keywordRef.current) return;

//     try {
//       setLoading(true);
//       setError('');

//       const response = await searchPosts({
//         keyword: keywordRef.current,
//         page: pageRef.current,
//         limit: 10,
//         sortType: sortTypeRef.current
//       });

//       const newPosts = response.searchPosts;
//       setPosts(prev => 
//         pageRef.current === 1 ? newPosts : [...prev, ...newPosts]
//       );
//       setHasMore(newPosts.length >= 10);
//       setPage(prev => prev + 1);
//     } catch (err) {
//       setError('搜索失败，请稍后重试');
//       console.error('搜索错误:', err);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   // 初始化IntersectionObserver
//   useEffect(() => {
//     observerRef.current = new IntersectionObserver(
//       (entries) => {
//         entries.forEach(entry => {
//           if (entry.isIntersecting && !loadingRef.current && hasMoreRef.current) {
//             fetchData();
//           }
//         });
//       },
//       { rootMargin: '100px' }
//     );

//     if (sentinelRef.current) {
//       observerRef.current.observe(sentinelRef.current);
//     }

//     return () => {
//       if (observerRef.current) {
//         observerRef.current.disconnect();
//       }
//     };
//   }, [fetchData]);

//   // 处理搜索条件变化
//   useEffect(() => {
//     if (!keyword) {
//       setPosts([]);
//       return;
//     }

//     // 重置状态并重新加载
//     setPosts([]);
//     setPage(1);
//     setHasMore(true);
//   }, [keyword, sortType]);

//   // 排序配置
//   const sortItems = [
//     { name: '按热度', handleFunc: () => setSortType('replies') },
//     { name: '按时间', handleFunc: () => setSortType('createdAt') }
//   ];
//   const sortIndex = sortType === 'replies' ? 0 : 1;

//   return (
//     <div className="search-post-results">
//       {error && <div className="error-message">{error}</div>}

//       <SortTop sortIndex={sortIndex} sortItems={sortItems} stickyTop='stickyTop'/>

//       <div className="post-list">
//         {posts.length > 0 ? (
//           posts.map(post => (
//             <div key={post._id} className="post-card" onClick={(e) => {
//               e.stopPropagation();
//               nav(`post/${post._id}`);
//             }}>
//               <div className="post-header">
//                 <img 
//                   src={post.author.avatar || '/default-user.png'} 
//                   alt={post.author.username}
//                   className="creator-avatar"
//                 />
//                 <span className="creator-name">{post.author.username}</span>
//               </div>
//               <div className="post-content">
//                 <h3 className="post-title">{post.title}</h3>
//                 <p className="post-description">{post.content}</p>
//               </div>
//               <div className="post-stats">
//                 <span>👍 {post.likes}</span>
//                 <span>💬 {post.replies}</span>
//                 <span>📅 {formatPublishTime(post.createdAt)}</span>
//               </div>
//             </div>
//           ))
//         ) : (
//           keyword && !loading && <div className="no-results">暂无相关帖子</div>
//         )}
//       </div>

//       {/* 哨兵元素 */}
//       <div ref={sentinelRef} className="sentinel" />

//       {loading && (
//         <div className="loading-indicator">
//           <Loading/>
//         </div>
//       )}
      
//       {!hasMore && posts.length > 0 && (
//         <div className="no-more-data">已经到底啦~</div>
//       )}
//     </div>
//   );
// };

// export default SearchPost;

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { searchPosts } from '../../../api/post';
import './SearchPost.scss';
import { useNavigate } from 'react-router-dom';
import SortTop from '../../../components/SortTop/SortTop';
import Loading from '../../../components/Loading/Loading';
import { formatPublishTime } from '../../../utils/time/formatPublishTime';

const SearchPost = ({ keyword }) => {
  // 状态管理
  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [sortType, setSortType] = useState('replies');

    // 使用Ref解决闭包问题
  const pageRef = useRef(page);
  const sortTypeRef = useRef(sortType);
  const loadingRef = useRef(loading);
  const hasMoreRef = useRef(hasMore);
  const keywordRef = useRef(keyword);

  // 观察器相关Ref
  const sentinelRef = useRef(null);
  const observerRef = useRef(null);
  const nav = useNavigate();

  // 同步Ref与State
  useEffect(() => {
    pageRef.current = page;
    sortTypeRef.current = sortType;
    loadingRef.current = loading;
    hasMoreRef.current = hasMore;
    keywordRef.current = keyword;
  }, [page, sortType, loading, hasMore, keyword]);
  // 核心数据获取方法修改
  const fetchData = useCallback(
    async (targetPage, targetSort) => {
      if (loadingRef.current || !keywordRef.current) return;

      try {
        setLoading(true);
        setError('');

        const response = await searchPosts({
          keyword: keywordRef.current,
          page: targetPage,
          limit: 10,
          sortType: targetSort
        });

        const newPosts = response.searchPosts;
        setPosts(prev => 
          targetPage === 1 ? newPosts : [...prev, ...newPosts]
        );
        setHasMore(newPosts.length >= 10);
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
      setPosts([]);
      return;
    }

    setPosts([]);
    setPage(1);
    setHasMore(true);
    fetchData(1, sortType);
  }, [keyword, sortType, fetchData]);

  // ...保持其他逻辑不变...
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
    { name: '按热度', handleFunc: () => setSortType('replies') },
    { name: '按时间', handleFunc: () => setSortType('createdAt') }
  ];
  const sortIndex = sortType === 'replies' ? 0 : 1;

  return (
    <div className="search-post-results">
      {error && <div className="error-message">{error}</div>}

      <SortTop sortIndex={sortIndex} sortItems={sortItems} stickyTop='stickyTop'/>

      <div className="post-list">
        {posts.length > 0 ? (
          posts.map(post => (
            <div key={post._id} className="post-card" onClick={(e) => {
              e.stopPropagation();
              nav(`post/${post._id}`);
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

      {/* 哨兵元素 */}
      <div ref={sentinelRef} className="sentinel" />

      {loading && (
        <div className="loading-indicator">
          <Loading/>
        </div>
      )}
      
      {!hasMore && posts.length > 0 && (
        <div className="no-more-data">已经到底啦~</div>
      )}
    </div>
  );
};

export default SearchPost;