import Banner from '../../../components/Banner/Banner'
import './HomeRecommend.scss'
// import PostCard from '../../../components/ContentCard/PostCard/PostCard.js'
const HomeRecommend = () => {
    const videoUrl = '/videos/ban.mp4'
    const imgUrl = [
"/images/header/banner/小小陈.png",
"/images/header/banner/unlock_wallpaper_1.jpg",
"/images/header/banner/unlock_wallpaper_2.jpg",
"/images/header/banner/unlock_wallpaper_3.jpg",
"/images/header/banner/unlock_wallpaper_4.jpg",
"/images/header/banner/unlock_wallpaper_5.jpg",
"/images/header/banner/unlock_wallpaper_6.jpg",
"/images/header/banner/unlock_wallpaper_7.jpg",
"/images/header/banner/unlock_wallpaper_8.jpg",
    ]
    return (
        <div className="home-recommend">
            <header className="home-recommend__header">
                <Banner bannerType={2} bannerData={imgUrl}/>
            </header>
            <main className="home-recommend__main">
                1
                {/* <PostCard/> */}
            </main>
        </div>
    )
}
export default HomeRecommend