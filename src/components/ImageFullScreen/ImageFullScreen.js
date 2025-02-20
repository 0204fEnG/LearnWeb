import React, { useState, useEffect, useRef } from 'react';
import './ImageFullScreen.scss'; // 引入样式文件

const ImageFullScreen = ({ images, initialIndex, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const imageContainerRef = useRef(null); // 图片容器引用
  const thumbnailContainerRef = useRef(null); // 缩略图容器引用

  // 禁用背景滚动
  // useEffect(() => {
  //   document.body.style.overflow = 'hidden';
  //   return () => {
  //     document.body.style.overflow = 'auto';
  //   };
  // }, []);

  // 切换图片
    const handleImageChange = (index) => {
    // setCurrentIndex(index);
    scrollToImage(index);
  };

  // 滚动到指定图片
  const scrollToImage = (index) => {
    if (imageContainerRef.current) {
      const imageWidth = imageContainerRef.current.clientWidth;
      imageContainerRef.current.scrollTo({
        left: index * imageWidth,
        behavior: 'instant',
      });
    }
  };

  // 监听图片容器的滚动事件
  useEffect(() => {
    const handleScroll = () => {
      if (imageContainerRef.current) {
        const imageWidth = imageContainerRef.current.clientWidth;
        const scrollLeft = imageContainerRef.current.scrollLeft;
        const newIndex = Math.round(scrollLeft / imageWidth);
        setCurrentIndex(newIndex);
      }
    };

    if (imageContainerRef.current) {
      imageContainerRef.current.addEventListener('scroll', handleScroll);
      }
    if (imageContainerRef.current) {
      const imageWidth = imageContainerRef.current.clientWidth;
      imageContainerRef.current.scrollTo({
        left: initialIndex * imageWidth,
        behavior: 'instant',
      });
    }
    return () => {
      if (imageContainerRef.current) {
        imageContainerRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  // 缩略图滚动到当前图片
  useEffect(() => {
    if (thumbnailContainerRef.current) {
      thumbnailContainerRef.current.scrollTo({
        left: currentIndex * 90,
        behavior: 'smooth',
      });
      }
  }, [currentIndex, images.length]);

  return (
    <div className="full-modal-overlay">
      <div className="full-modal-content">
        <div className="full-image-container"  onClick={onClose} ref={imageContainerRef}>
          {images.map((src, index) => (
            <div key={index} className="full-image-wrapper">
              <img
                src={src}
                alt={`Fullscreen ${index}`}
                className="full-screen-image"
              />
            </div>
          ))}
        </div>
        <button className="full-close-button" onClick={onClose}>×</button>
        <div className="full-pagination-dots">
          {images.map((_, index) => (
            <span
              key={index}
              className={`full-dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => handleImageChange(index)}
            />
          ))}
        </div>
        <div className="full-thumbnail-container" ref={thumbnailContainerRef}>
          {images.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Thumbnail ${index}`}
              className={`full-thumbnail ${index === currentIndex ? 'active' : ''}`}
              onClick={() => handleImageChange(index)}
            />
          ))}
          </div>
      </div>
    </div>
  );
};

export default ImageFullScreen;