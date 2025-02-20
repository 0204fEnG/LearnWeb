import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './PostCard.scss';
import ThreeDotsVer from '../../icons/ThreeDotsVer';
import NineGrid from '../../NineGrid/NineGrid';
const PostCard = ({ postItem }) => {
  const navigate = useNavigate();

  const imagesRef = useRef([]);  // 用于存储图片的引用
  // 处理标签点击
  const handleTagClick = (path) => {
    navigate(path);
  };

  // 渲染带标签的内容
  const renderContentWithTags = (postItem) => {
    let contentParts = [];
    let currentIndex = 0;

    postItem.tags.forEach((tag) => {
      const beforeTag = postItem.content.slice(currentIndex, tag.index);
      if (beforeTag) {
        contentParts.push(beforeTag);
      }

      contentParts.push(
        <span
          key={tag.name}
          className="tag"
          onClick={() => handleTagClick(`/circles/circle/${tag.name}`)}
        >
          #{tag.name}#
        </span>
      );

      currentIndex = tag.index;
    });

    if (currentIndex < postItem.content.length) {
      contentParts.push(postItem.content.slice(currentIndex));
    }

    return contentParts;
  };

// 当窗口尺寸改变时，部分图片的 src 会丢失并恢复为默认的 alt.png，这通常是由于图片懒加载逻辑中的某些问题导致的。以下是一些可能的原因和解决方案：

// 1. Intersection Observer 的重新触发
// 当窗口尺寸改变时，元素的可见性可能会发生变化，导致 Intersection Observer 重新触发。如果观察器的回调函数没有正确处理这种情况，可能会导致图片的 src 被重置。

// 解决方案：确保在 Intersection Observer 的回调函数中，只有在图片确实需要加载时才设置 src，并且避免重复设置。

// 2. 图片引用的丢失
// 如果 imagesRef.current 中的引用在组件重新渲染时丢失或发生变化，可能会导致图片的 src 被重置。

// 解决方案：确保 imagesRef.current 中的引用在组件重新渲染时保持不变。可以使用 useEffect 的依赖项来控制引用的更新。

// 3. 图片的重新渲染
// 当窗口尺寸改变时，组件可能会重新渲染，导致图片元素重新创建。如果图片的 src 没有正确保留，可能会恢复为默认值。

// 解决方案：在图片元素上使用 key 属性，确保图片在重新渲染时保持一致性。

// 4. Intersection Observer 的配置
// Intersection Observer 的配置（如 rootMargin 和 threshold）可能会影响图片的加载行为。如果配置不当，可能会导致图片在窗口尺寸改变时重新加载。

// 解决方案：调整 Intersection Observer 的配置，确保图片在窗口尺寸改变时不会不必要地重新加载。

// 5. 图片的 data-src 属性
// 如果图片的 data-src 属性在窗口尺寸改变时被重置或丢失，可能会导致 src 恢复为默认值。

// 解决方案：确保 data-src 属性在窗口尺寸改变时保持不变。

  useEffect(() => {
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        const src = img.getAttribute('data-src');
        if (src) {  // 确保只在 src 未设置时加载图片
          img.src = src;
          img.className = 'img img-cover';
          observer.unobserve(img);
        }
      }
    });
  }, {
    rootMargin: '0px',
    threshold: 0,
  });

  imagesRef.current.forEach((img) => {
    if (img) {
      observer.observe(img);
    }
  });

  return () => {
    observer.disconnect();
  };
}, [postItem.imgs]);  // 依赖项中添加 postItem.imgs，确保图片数组变化时重新观察
  const handlePostContentClick = (event) => {
    if (event.target !== event.currentTarget) {
    return;
    }
    else {
      handleTagClick(`post/${postItem.postId}`)
    }
  }
  return (
    <article className="post-card">
      <div className="post-header">
        <img className="user-avator" src={postItem.userAvator} alt="用户头像" />
        <div className="user-info">
          <div className="user-name">{postItem.userName}</div>
          <div className="publish-time">{postItem.publishTime}</div>
        </div>
        <button className="three-container">
          <ThreeDotsVer className='three-icon'/>
        </button>
      </div>
      <div className="post-title">{postItem.title}</div>
      <div className="post-content" onClick={handlePostContentClick}>{renderContentWithTags(postItem)}</div>
      <div className='post-img'>
        <NineGrid images={postItem.imgs}/>
      </div>
      <div className="post-circle" onClick={() => handleTagClick(`/circles/circle/${postItem.circle.name}`)}>
        <img src={postItem.circle.avator} alt="圈子头像" className="circle-avator" />
        <div className="circle-name">{postItem.circle.name}</div>
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
        <div className="interactive-data">喜欢:{postItem.interactiveData.like}</div>
        <div className="interactive-data">回复数:{postItem.interactiveData.reply}</div>
        <div className="interactive-data">转发数:{postItem.interactiveData.retweet}</div>
      </div>
    </article>
  );
};

export default PostCard;