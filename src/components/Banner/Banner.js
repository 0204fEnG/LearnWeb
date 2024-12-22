import React, { lazy, Suspense } from 'react';
import './Banner.scss'
import PropTypes from 'prop-types'; 
const BannerVideo = lazy(() => import('./BannerVideo/BannerVideo.js'))
const BannerText = lazy(() => import('./BannerText/BannerText.js'))
const BannerImage=lazy(()=>import('./BannerImage/BannerImage.js'))
 // 用于 prop 校验
// Banner 组件
const Banner = ({ bannerType, bannerData}) => {
  let BannerContent
  switch (bannerType) {
    case 0:
      BannerContent = BannerVideo
      break
    case 1:
      BannerContent = BannerText
      break
    case 2:
      BannerContent =BannerImage
      break
    default:
      BannerContent = <div>无内容展示</div>
  }
  return (
    <div className="banner">
      <Suspense fallback={
        <div>Loading---------</div>
      }>
        <BannerContent videoUrl={bannerData} text={bannerData} images={ bannerData} />
      </Suspense>
    </div>
  )
};

// propTypes 校验，确保传入正确的 props 类型
Banner.propTypes = {
  bannerType:PropTypes.number,
  bannerContent:PropTypes.string
};


export default Banner;
