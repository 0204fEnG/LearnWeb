import { useLocation, useNavigate } from 'react-router-dom';
import './PostCard.scss'
const PostCard = ({postItem}) => {
      const navigate = useNavigate()
      const location=useLocation()
  const handleTagClick = (path) => {
    // 使用 navigate 导航到新路由
    navigate(path);
    };
const renderContentWithTags = (postItem) => {
  let contentParts = [];
  let currentIndex = 0; // 用于跟踪已处理内容的当前位置

  // 遍历 postItem.tags 数组
  postItem.tags.forEach((tag) => {

    // 获取标签位置之前的文本
    const beforeTag = postItem.content.slice(currentIndex, tag.index);
    // 如果之前有文本，则添加到 contentParts
    if (beforeTag) {
      contentParts.push(beforeTag);
    }

    // 创建标签元素并添加到 contentParts
    contentParts.push(
      <span
        key={tag.name}
        className='tag'
        onClick={() => handleTagClick(`/circles/circle/${tag.name}`)}
      >
        #{tag.name}#
      </span>
    );

    // 更新 currentIndex 为当前标签之后的位置
    currentIndex = tag.index;
  });

  // 循环结束后，添加剩余的文本到 contentParts
  if (currentIndex < postItem.content.length) {
    contentParts.push(postItem.content.slice(currentIndex));
  }

  // 返回包含文本和标签元素的数组
  return contentParts;
  };
  const handlePostContentClick = (event) => {
    if (event.target !== event.currentTarget) {
    return;
    }
    else {
      handleTagClick(`post/${postItem.postId}`)
    }
  }
    return <article className="post-card">
        <div className="post-header">
            <img className="user-avator" src={postItem.userAvator } alt="用户头像"/>
            <div className="user-info">
                <div className="user-name">{postItem.userName }</div>
                <div className="publish-time">{postItem.publishTime }</div>
            </div>
        </div>
        <div className="post-title">{postItem.title}</div>
        <div className="post-content" onClick={handlePostContentClick}>{renderContentWithTags(postItem)}</div>
        <div className={`post-img ${postItem.imgs.length===1?'first':postItem.imgs.length===2?'second':''}`}>
        {postItem.imgs.map((img, index) =>
              <div className="img-container" key={index}>
                <img className='img'  src={img} alt="帖子图片" loading="lazy"/>
                </div>)
            }
        </div>
        <div className="post-circle" onClick={() => handleTagClick(`circles/circle/${postItem.circle.name}`)}>
            <img src={postItem.circle.avator} alt="圈子头像" className="circle-avator" />
            <div className="circle-name">{postItem.circle.name }</div>
        </div>
        <div className="popular-comment">
            <div className="like">{postItem.popularComment.like}赞</div>
            <div className="comment-container">
                <span className="name">
                    {postItem.popularComment.name}&nbsp;:&nbsp;
                </span>
                    {postItem.popularComment.comment}
            </div>
        </div>
        <div className="post-interactive-data">
            <div className="interactive-data">喜欢:{postItem.interactiveData.like }</div>
            <div className="interactive-data">回复数:{postItem.interactiveData.reply }</div>
            <div className="interactive-data">转发数:{postItem.interactiveData.retweet }</div>
        </div>
    </article>
}
export default PostCard