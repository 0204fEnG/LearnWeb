// import { Link, useNavigate, useParams } from 'react-router-dom';
// import './Post.scss';
// import { useEffect, useRef, useState } from 'react';
// import ChevronLeftIcon from '../../components/icons/ChevronLeftIcon';
// import NineGrid from '../../components/NineGrid/NineGrid';
// import ThreeDotsVer from '../../components/icons/ThreeDotsVer';
// import { useActivate } from 'react-activation';
// import Comment from '../../components/Comment/Comment';
// import SortTop from '../../components/SortTop/SortTop';
// import { formatPublishTime } from '../../utils/time/formatPublishTime';
// import { getPost } from '../../api/post'; // 导入 getPost API

// const Post = () => {
//   const [isFinal, setIsFinal] = useState(false);
//   const [sortIndex, setSortIndex] = useState(0); // 0 热度 1 最新
//   const [post, setPost] = useState(null); // 帖子数据
//   const [loading, setLoading] = useState(true); // 加载状态
//   const [error, setError] = useState(null); // 错误状态

//   const sortItems = [
//     {
//       name: '按热度',
//       handleFunc: () => {
//         setSortIndex(0);
//       },
//     },
//     {
//       name: '按时间',
//       handleFunc: () => {
//         setSortIndex(1);
//       },
//     },
//   ];

//   const nav = useNavigate();
//   const { postId } = useParams();
//   const timer = useRef(null);
//   // 加载帖子数据
//   useEffect(() => {
//     const fetchPost = async () => {
//       try {
//         setLoading(true);
//         const response = await getPost(postId);
//         setPost(response.post); // 假设返回的数据结构为 { data: { post: {...} } }
//         setError(null);
//       } catch (err) {
//         setError('加载帖子失败，请稍后重试');
//         console.error('加载帖子失败:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPost();
//   }, [postId]);

//   const handleMaskClick = (event) => {
//     if (!isFinal) {
//       clearTimeout(timer.current);
//       setIsFinal(true);
//     } else {
//       setIsFinal(false);
//       timer.current = setTimeout(() => {
//         nav(-1);
//       }, 300);
//     }
//   };

//   const imgs = [
//     '/images/header/banner/1.png',
//     '/images/header/banner/2.png',
//     '/images/header/banner/3.png',
//     '/images/header/banner/4.png',
//     '/images/header/banner/5.png',
//     '/images/header/banner/6.png',
//     '/images/header/banner/1(1).jpeg',
//     '/images/header/banner/1(4).jpeg',
//     '/images/header/banner/1(3).jpeg',
//   ];

//   useActivate(() => {
//     setIsFinal(true);
//   });

//   useEffect(() => {
//     timer.current = setTimeout(() => {
//       setIsFinal(true);
//     }, 0);
//     return () => {
//       clearTimeout(timer.current);
//     };
//   }, []);

//   // 加载中状态
//   if (loading) {
//     return <div className="post-mask final">加载中...</div>;
//   }

//   // 错误状态
//   if (error) {
//     return <div className="post-mask final">{error}</div>;
//   }

//   // 帖子数据未找到
//   if (!post) {
//     return <div className="post-mask final">帖子未找到</div>;
//   }

//   return (
//     <div className={`post-mask ${isFinal && 'final'}`} onClick={handleMaskClick}>
//       <div className={`post-css-container ${isFinal && 'final'}`}>
//         <div
//           onClick={(event) => {
//             event.stopPropagation(); // 阻止事件冒泡
//           }}
//           className="post-container"
//         >
//           <div className="header">
//             <div onClick={handleMaskClick} className="back-container">
//               <ChevronLeftIcon className="back" />
//             </div>
//             <div className="author-info">
//               <Link
//                 to={`/user/${post.author._id}/user-home`}
//                 className="img-container"
//               >
//                 <img
//                   src={post.author.avatar}
//                   alt="用户头像"
//                   className="avatar"
//                 />
//               </Link>
//               <Link
//                 to={`/user/${post.author._id}/user-home`}
//                 className="name-container"
//               >
//                 <span className="name">{post.author.username}</span>
//                               <span className="publish-time">{formatPublishTime(post.createdAt )}</span>
//               </Link>
//             </div>
//             <div className="follow-container">
//               <button className="follow">关注</button>
//             </div>
//             <button className="three">
//               <ThreeDotsVer className="three-svg" />
//             </button>
//           </div>
//           <div className="content-container">
//             <div className="post-title">{post.title}</div>
//             <div className="article">{post.content}</div>
//             <div className="img-container">
//               <NineGrid images={post.images || []} />
//             </div>
//           </div>
//           <div className="comments-container">
//             <SortTop
//               stickyTop="sort-sticky-top"
//               sortIndex={sortIndex}
//               sortItems={sortItems}
//             />
//             <Comment />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Post;

import { Link, useNavigate, useParams } from 'react-router-dom';
import './Post.scss';
import { useEffect, useRef, useState } from 'react';
import ChevronLeftIcon from '../../components/icons/ChevronLeftIcon';
import NineGrid from '../../components/NineGrid/NineGrid';
import ThreeDotsVer from '../../components/icons/ThreeDotsVer';
import { useActivate } from 'react-activation';
import Comment from '../../components/Comment/Comment';
import SortTop from '../../components/SortTop/SortTop';
import { formatPublishTime } from '../../utils/time/formatPublishTime';
import { getPost } from '../../api/post';

const Post = () => {
  const [isFinal, setIsFinal] = useState(false);
  const [sortIndex, setSortIndex] = useState(0); // 0 热度 1 最新
  const [post, setPost] = useState(null); // 帖子数据
  const [loading, setLoading] = useState(true); // 加载状态
  const [error, setError] = useState(null); // 错误状态

  const nav = useNavigate();
  const { postId } = useParams();
  const timer = useRef(null);

  // 排序选项
  const sortItems = [
    {
      name: '按热度',
      handleFunc: () => setSortIndex(0),
    },
    {
      name: '按时间',
      handleFunc: () => setSortIndex(1),
    },
  ];

  // 获取帖子数据
  useEffect(() => {
    const fetchPostData = async () => {
      try {
        setLoading(true);
        const response = await getPost(postId);
        setPost(response.post);
        setError(null);
      } catch (err) {
        setError('加载帖子失败，请稍后重试');
        console.error('加载帖子失败:', err);
      } finally {
        setLoading(false);
      }
    };

    if (postId) {
      fetchPostData();
    }
  }, [postId]);

  // 处理遮罩点击事件
  const handleMaskClick = (event) => {
    event.stopPropagation();
    if (!isFinal) {
      timer.current = setTimeout(() => {
        setIsFinal(true);
      }, 0);
    } else {
      setIsFinal(false);
      timer.current = setTimeout(() => {
        nav(-1);
      }, 300);
    }
  };

  // 清理定时器
  useEffect(() => {
        timer.current = setTimeout(() => {
      setIsFinal(true);
    }, 0);
    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, []);

  // 加载中状态
  if (loading) {
    return <div className="post-mask final">加载中...</div>;
  }

  // 错误状态
  if (error) {
    return <div className="post-mask final">{error}</div>;
  }

  // 帖子数据未找到
  if (!post) {
    return <div className="post-mask final">帖子未找到</div>;
  }

  return (
    <div className={`post-mask ${isFinal ? 'final' : ''}`} onClick={handleMaskClick}>
      <div className={`post-css-container ${isFinal ? 'final' : ''}`}>
        <div
          onClick={(event) => event.stopPropagation()}
          className="post-container"
        >
          {/* 头部区域 */}
          <div className="header">
            <div onClick={handleMaskClick} className="back-container">
              <ChevronLeftIcon className="back" />
            </div>
            <div className="author-info">
              <Link
                to={`/user/${post.author._id}/user-home`}
                className="img-container"
              >
                <img
                  src={post.author.avatar}
                  alt="用户头像"
                  className="avatar"
                />
              </Link>
              <Link
                to={`/user/${post.author._id}/user-home`}
                className="name-container"
              >
                <span className="name">{post.author.username}</span>
                <span className="publish-time">
                  {formatPublishTime(post.createdAt)}
                </span>
              </Link>
            </div>
            <div className="follow-container">
              <button className="follow">关注</button>
            </div>
            <button className="three">
              <ThreeDotsVer className="three-svg" />
            </button>
          </div>

          {/* 内容区域 */}
          <div className="content-container">
            <div className="post-title">{post.title}</div>
            <div className="article">{post.content}</div>
            <div className="img-container">
              <NineGrid images={post.images || []} />
            </div>
          </div>

          {/* 评论区域 */}
          <div className="comments-container">
            <SortTop
              stickyTop="sort-sticky-top"
              sortIndex={sortIndex}
              sortItems={sortItems}
            />
            <Comment />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;