import React from 'react';
import './Banner.css'
import PropTypes from 'prop-types';  // 用于 prop 校验

// Banner 组件
const Banner = ({ title, text, imageUrl, videoUrl, backgroundColor }) => {
  return (
    <div className="banner">
          {videoUrl ? (
        <div className="banner__video-container">
        <video className="banner__video--outer" autoPlay muted loop>
          <source src={videoUrl} type="video/mp4" />
          您的浏览器暂不支持播放音视频
        </video>
        <video className="banner__video--inner" autoPlay muted loop>
          <source src={videoUrl} type="video/mp4" />
        </video>
        </div>
      ) : imageUrl ? (
        <img className="banner__image" src={imageUrl} alt="Banner" />
      ) : null}
    </div>
  );
};

// propTypes 校验，确保传入正确的 props 类型
Banner.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
  imageUrl: PropTypes.string,
  videoUrl: PropTypes.string,
  backgroundColor: PropTypes.string,
};

// 默认 props
Banner.defaultProps = {
  backgroundColor: '', // 默认背景色
  title: '',
  text: '',
  imageUrl: '',
  videoUrl: '',
};

export default Banner;
