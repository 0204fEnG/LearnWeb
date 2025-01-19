import React from "react"
import './BannerVideo.scss'
const BannerVideo = ({videoUrl}) => {
    return (
        <div className="banner-video-container">
        <video className="banner-video--outer" autoPlay muted loop>
          <source src={videoUrl} type="video/mp4" />
        </video>
        <video className="banner-video--inner" autoPlay muted loop>
          <source src={videoUrl} type="video/mp4" />
        </video>
        </div>
    )
}
export default BannerVideo