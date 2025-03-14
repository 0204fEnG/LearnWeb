// import React, { useState, useEffect, useRef, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './PostCard.scss';
// import ThreeDotsVer from '../../icons/ThreeDotsVer';
// import NineGrid from '../../NineGrid/NineGrid';
// const PostCard = ({ postItem }) => {
//   const navigate = useNavigate();
//   // 处理标签点击
//   const handleTagClick = (path) => {
//     navigate(path);
//   };

//   // 渲染带标签的内容
//   const renderContentWithTags = (postItem) => {
//     let contentParts = [];
//     let currentIndex = 0;

//     postItem.tags.forEach((tag) => {
//       const beforeTag = postItem.content.slice(currentIndex, tag.index);
//       if (beforeTag) {
//         contentParts.push(beforeTag);
//       }

//       contentParts.push(
//         <span
//           key={tag.name}
//           className="tag"
//           onClick={(e) => {
//             e.stopPropagation()
//             handleTagClick(`/topic/${tag.name}`)
//           }
//           }
//         >
//           #{tag.name}#
//         </span>
//       );

//       currentIndex = tag.index;
//     });

//     if (currentIndex < postItem.content.length) {
//       contentParts.push(postItem.content.slice(currentIndex));
//     }

//     return contentParts;
//   };
//   const handlePostContentClick = (event) => {
//       handleTagClick(`post/${postItem.postId}`)
//   }
//   return (
//     <article className="post-card"  onClick={(event) => {
//         handlePostContentClick(event)
//       }
//       }>
//       <div className="post-header">
//         <img className="user-avator" src={postItem.userAvator} alt="用户头像" />
//         <div className="user-info">
//           <div className="user-name">{postItem.userName}</div>
//           <div className="publish-time">{postItem.publishTime}</div>
//         </div>
//         <button className="three-container">
//           <ThreeDotsVer className='three-icon'/>
//         </button>
//       </div>
//       <div className="post-title">{postItem.title}</div>
//       <div className="post-content">{renderContentWithTags(postItem)}</div>
//       <div className='post-img'>
//         <NineGrid images={postItem.imgs}/>
//       </div>
//       <div className="post-circle" onClick={(e) => {
//         e.stopPropagation()
//         handleTagClick(`/circles/circle/${postItem.circle.name}`)
//       }
//       }>
//         <img src={postItem.circle.avator} alt="圈子头像" className="circle-avator" />
//         <div className="circle-name">{postItem.circle.name}</div>
//       </div>
//       <div className="popular-comment">
//         <div className="like">{postItem.popularComment.like}赞</div>
//         <div className="comment-container">
//           <span className="name">
//             {postItem.popularComment.name}&nbsp;:&nbsp;
//           </span>
//           {postItem.popularComment.comment}
//         </div>
//       </div>
//       <div className="post-interactive-data">
//         <div className="interactive-data">喜欢:{postItem.interactiveData.like}</div>
//         <div className="interactive-data">回复数:{postItem.interactiveData.reply}</div>
//         <div className="interactive-data">转发数:{postItem.interactiveData.retweet}</div>
//       </div>
//     </article>
//   );
// };

// export default PostCard;


import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PostCard.scss';
import ThreeDotsVer from '../../icons/ThreeDotsVer';
import NineGrid from '../../NineGrid/NineGrid';
import { formatPublishTime } from '../../../utils/time/formatPublishTime';
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
        <div className="interactive-data">👍: {postItem.likes}</div> {/* 使用 likes */}
        <div className="interactive-data">💬: {postItem.replies}</div> {/* 使用 replies */}
        <div className="interactive-data">⭐: {postItem.favorites}</div> {/* 使用 favorites */}
      </div>
    </article>
  );
};

export default PostCard;