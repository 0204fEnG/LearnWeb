import './Home.scss'
import ContentCard from '../../components/Home/ContentCard/ContentCard.js'
import Banner from '../../components/Banner/Banner.js'
const Home = () => {
    const videoUrl ='/videos/x5.mp4'
    return <div className="app-home">
        <Banner bannerType={0} bannerData={videoUrl}/>
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
    </div>
}
export default Home