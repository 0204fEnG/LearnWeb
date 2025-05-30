import { Link, useNavigate, useParams } from 'react-router-dom';
import './Post.scss';
import { useEffect, useRef, useState } from 'react';
import ChevronLeftIcon from '../../components/icons/ChevronLeftIcon';
import NineGrid from '../../components/NineGrid/NineGrid';
import ThreeDotsVer from '../../components/icons/ThreeDotsVer';
import Comment from '../../components/Comment/Comment';
import { formatPublishTime } from '../../utils/time/formatPublishTime';
import { getPost } from '../../api/post';
import Loading from '../../components/Loading/Loading';

const Post = () => {
  const [isFinal, setIsFinal] = useState(true);
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const nav = useNavigate();
  const { postId } = useParams();
  const timer = useRef(null);

  // 渲染带标签的内容
  const renderContentWithTags = (content, tags) => {
    if (!tags || tags.length === 0) {
      return content;
    }

    let contentParts = [];
    let currentIndex = 0;

    tags.forEach((tag) => {
      const beforeTag = content.slice(currentIndex, tag.index);
      if (beforeTag) {
        contentParts.push(beforeTag);
      }

      contentParts.push(
        <span
          key={`${tag.name}-${tag.index}`}
                   style={{
            color:`var(--active-color)`,
      cursor: `pointer`
                }}
          onClick={(e) => {
            e.stopPropagation();
            nav(`/topic/${tag.name}`);
          }}
        >
          #{tag.name}#
        </span>
      );

      currentIndex = tag.index;
    });

    if (currentIndex < content.length) {
      contentParts.push(content.slice(currentIndex));
    }

    return contentParts;
  };

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
    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, []);

  return (
    <div className={`post-mask ${isFinal ? 'final' : ''}`} onClick={handleMaskClick}>
      <div className={`post-css-container ${isFinal ? 'final' : ''}`}>
        {loading ? <Loading /> :
          error ? { error } :
            !post?'帖子未找到':
          <div
            onClick={(event) => event.stopPropagation()}
            className="post-container"
          >
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
              <div className="article">
                {renderContentWithTags(post.content, post.tags)}
              </div>
              <div className="img-container">
                <NineGrid images={post.images || []} />
              </div>
            </div>
            {/* 评论区域 */}
            <div className="comments-container">
              <Comment postId={postId}/>
            </div>
          </div>
        }
      </div>
    </div>
  );
};

export default Post;