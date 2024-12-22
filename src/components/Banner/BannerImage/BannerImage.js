import React, { useState, useEffect } from 'react';
import './BannerImage.scss'
const BannerImage = ({ images, interval = 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // 切换到下一张图片
  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // 切换到上一张图片
  const goToPrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  // 设置自动播放
  useEffect(() => {
    const timer = setInterval(goToNext, interval);
    return () => clearInterval(timer); // 组件卸载时清除定时器
  }, [currentIndex, interval]);

  return (
    <div className="banner-image-container">
      <button className="prev" onClick={goToPrev}>Prev</button>
          <img className="image" src={images[currentIndex]} alt={`Image ${currentIndex}`} />
      <button className="next" onClick={goToNext}>Next</button>
      <div className="indicators">
        {images.map((_, index) => (
            <button
            className="indicators__button"
            key={index}
            className={index === currentIndex ? 'active' : ''}
            onClick={() => setCurrentIndex(index)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BannerImage;
