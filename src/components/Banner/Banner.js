import React, { lazy, Suspense } from 'react';
import './Banner.css'
import PropTypes from 'prop-types'; 
const BannerVideo=lazy(()=>import('./BannerVideo/BannerVideo'))
 // 用于 prop 校验
// Banner 组件
const Banner = ({ bannerType, bannerData,bannerScrollY }) => {
  let BannerContent
  switch (bannerType) {
    case 0:
      BannerContent = BannerVideo
      break
    // case 1:
    //   bannerContent =
    //   break
    // case 2:
    //   bannerContent
    //   break
    default:
      BannerContent = <div>无内容展示</div>
  }
  return (
    <div className={`banner ${bannerScrollY>60?'fixed':''}`}>
      <Suspense fallback={
        <div>Loading---------</div>
      }>
        <BannerContent {...bannerData}/>
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
