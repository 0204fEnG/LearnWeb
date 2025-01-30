import { useState } from 'react'
import Banner from '../../../components/Banner/Banner'
import './HomeRecommend.scss'
import { NavLink } from 'react-router-dom'
// import PostCard from '../../../components/ContentCard/PostCard/PostCard.js'
const HomeRecommend = () => {
    const videoUrl = '/videos/ban.mp4'
    const imgUrl = [
"/images/header/banner/春霖翠意.jpg",
"/images/header/banner/迭翠千里.jpg",
"/images/header/banner/冬夜小镇.jpg",
"/images/header/banner/星蕴蓝.jpg",
"/images/header/banner/诗野千里.jpg",
"/images/header/banner/星蕴金.jpg",
    ]
    return (
        <div className="home-recommend">
            <header className="home-recommend__header">
                <Banner bannerType={2} bannerData={imgUrl}/>
            </header>
            <main className="home-recommend__main">
                <NavLink to='/circles/circle/美食'>去美食圈子</NavLink>
                <NavLink to='/circles/circle/科技'>去科技圈子</NavLink>
            </main>
        </div>
    )
}
export default HomeRecommend