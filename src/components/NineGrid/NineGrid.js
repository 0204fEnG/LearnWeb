import React, { useEffect, useRef, useState } from 'react';
import './NineGrid.scss'; // 用于样式控制
import ImageFullScreen from '../ImageFullScreen/ImageFullScreen';
const NineGrid = ({ images }) => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [initialIndex, setInitialIndex] = useState(0);
  const handleThumbnailClick = (index) => {
    setInitialIndex(index);
    setIsFullScreen(true);
  };
  const imageCount = images.length;

  const getImageStyle = (index) => {
    let style = {};

    if (imageCount === 1 || imageCount === 2) {
      // 1 或 2 张图片时，每张图片占一半宽度
      style.width = 'calc(50% - 1.5px)'; // 减去间距的一半
    } else if (imageCount === 3 || imageCount === 6 || imageCount === 9) {
      // 3、6、9 张图片时，每行显示 3 张
      style.width = 'calc(33.33% - 2px)'; // 减去间距的一部分
    } else if (imageCount === 4 || imageCount === 5 || imageCount === 7 || imageCount === 8) {
      // 4、5、7、8 张图片时，最后一行显示 2 张
      const isLastRow = index >= Math.floor(imageCount / 3) * 3;
      if (isLastRow) {
        style.width = 'calc(50% - 1.5px)'; // 最后一行图片占一半宽度
      } else {
        style.width = 'calc(33.33% - 2px)'; // 其他行图片占 1/3 宽度
      }
    }

    return style;
  };
  const imagesRef = useRef([]);  // 用于存储图片的引用
  useEffect(() => {
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          const src = img.getAttribute('data-src');
          if (src) {  // 确保只在 src 未设置时加载图片
            img.src = src;
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
  }, [images]);
  return (
    <div className="nine-grid-container">
      {images.map((src, index) => (
        <div
          key={index}
          className="nine-grid-item"
          style={getImageStyle(index)}
        >
          <div className="image-wrapper">
            <img
              ref={(el) => (imagesRef.current[index] = el)}  // 绑定图片引用
              data-src={src}  // 使用 data-src 存储图片 URL
              alt={`grid-${index}`}
              onClick={(e) => {
                e.stopPropagation()
                handleThumbnailClick(index)
              }
              }
              src='/icons/alt.svg'
            />
          </div>
        </div>
      ))}
      {isFullScreen && (
        <ImageFullScreen
          images={images}
          initialIndex={initialIndex}
          onClose={() => setIsFullScreen(false)}
        />
      )}
    </div>
  );
};

export default NineGrid;