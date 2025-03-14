import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PostCard.scss';
import ThreeDotsVer from '../../icons/ThreeDotsVer';
import NineGrid from '../../NineGrid/NineGrid';
import { formatPublishTime } from '../../../utils/time/formatPublishTime';
import Heart from '../../icons/Heart';
import HeartFull from '../../icons/HeartFull';
import ChatDots from '../../icons/ChatDots';
import Star from '../../icons/Star';
import StarFull from '../../icons/StarFull';
const PostCard = ({ postItem }) => {
  const navigate = useNavigate();

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
          onClick={(e) => {
            e.stopPropagation();
            handleTagClick(`/topic/${tag.name}`);
          }}
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

  // 处理帖子内容点击
  const handlePostContentClick = (event) => {
    handleTagClick(`post/${postItem._id}`);
  };

  return (
    <article
      className="post-card"
      onClick={(event) => {
        handlePostContentClick(event);
      }}
    >
      <div className="post-header">
        <img
          className="user-avator"
          src={postItem.author.avatar} // 使用 authorId.avatar
          alt="用户头像"
        />
        <div className="user-info">
          <div className="user-name">{postItem.author.username}</div> {/* 使用 authorId.username */}
          <div className="publish-time">{formatPublishTime(postItem.createdAt)}</div> {/* 使用 createdAt */}
        </div>
        <button className="three-container">
          <ThreeDotsVer className="three-icon" />
        </button>
      </div>
      <div className="post-title">{postItem.title}</div>
      <div className="post-content">{renderContentWithTags(postItem)}</div>
      {postItem.images.length > 0 &&
        <div className="post-img">
      <NineGrid images={postItem.images} /> {/* 使用 images */}
    </div>
}
      <div
        className="post-circle"
        onClick={(e) => {
          e.stopPropagation();
          handleTagClick(`/circles/circle/${postItem.circle.name}`); // 使用 circleId.name
        }}
      >
        <img
          src={postItem.circle.avatar} // 使用 circleId.avator
          alt="圈子头像"
          className="circle-avator"
        />
        <div className="circle-name">{postItem.circle.name}</div> {/* 使用 circleId.name */}
      </div>
      <div className="post-interactive-data">
        <div className="interactive-data"><Heart className={'icon-svg heart'}/>: {postItem.likes}</div> {/* 使用 likes */}
        <div className="interactive-data"><ChatDots className={'icon-svg reply'}/>: {postItem.replies}</div> {/* 使用 replies */}
        <div className="interactive-data"><Star className={'icon-svg star'}/>: {postItem.favorites}</div> {/* 使用 favorites */}
      </div>
    </article>
  );
};

export default PostCard;