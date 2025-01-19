import './HomeRecommend.scss'
import ContentCard from '../../../components/Home/ContentCard/ContentCard.js'
import Banner from '../../../components/Banner/Banner.js'
const HomeRecommend = () => {
    const videoUrl ='/videos/ban.mp4'
    return (
        <div className="home-recommend">
            <header className="home-recommend__header">
                <Banner bannerType={0} bannerData={videoUrl}/>
            </header>
            <main className="home-recommend__main">
                <ContentCard/>
                <ContentCard/>
                <ContentCard/>
                <ContentCard/>
                <ContentCard/>
                <ContentCard/>
                <ContentCard/>
                <ContentCard/>
                <ContentCard/>
                <ContentCard/>
                <ContentCard/>
                <ContentCard/>
                <ContentCard/>
                <ContentCard/>
            </main>
        </div>
    )
}
export default HomeRecommend