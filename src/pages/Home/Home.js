import { useContext, useState } from 'react'
import SectionCardContainer from '../../components/ContentCard/SectionCardContainer/SectionCardContainer'
import SectionNavbar from '../../components/Navbar/SectionNavbar/SectionNavbar'
import './Home.scss'
import HomeConcern from './HomeConcern/HomeConcern'
import HomeRecommend from './HomeRecommend/HomeRecommend'
import {appLeftShow} from'../../App.js'
const Home = () => {
    const [homeNavTargetIndex, setHomeNavTargetIndex] = useState(0)
    const {handleLeftIsShowClick}=useContext(appLeftShow)
    const homeSections = [
        {
            name: '推荐',
            component:()=><HomeRecommend/>
        },
        {
            name: '关注',
            component:()=><HomeConcern/>
        }
    ]
    const sectionsName=homeSections.map((section)=>section.name)
    const sectionsFuc = homeSections.map((section) => section.component)
    return <div className="app-home">
        <header className='app-home__header'>
            <div className="app-home__header__navs">
                <SectionNavbar sectionsName={sectionsName} targetIndex={homeNavTargetIndex}/>
            </div>
            <div className="app-home__header__search">
                 <div className='app-left-show' onClick={handleLeftIsShowClick}>=</div>
            </div>
        </header>
        <main className='app-home__main'>
            <SectionCardContainer sectionsFunc={sectionsFuc}/>
        </main>
    </div>
}
export default Home