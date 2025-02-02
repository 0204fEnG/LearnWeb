import {useState } from 'react'
import SectionCardContainer from '../../components/ContentCard/SectionCardContainer/SectionCardContainer'
import SectionNavbar from '../../components/Navbar/SectionNavbar/SectionNavbar'
import './Home.scss'
import HomeConcern from './HomeConcern/HomeConcern'
import HomeRecommend from './HomeRecommend/HomeRecommend'
import {useAppContext} from'../../App.js'
import Searchbar from '../../components/Searchbar/Searchbar.js'
const Home = () => {
    const {handleLeftIsShowClick}=useAppContext()
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
    const [homeNavTargetIndex, setHomeNavTargetIndex] = useState(0)
    const [homeSectionsScrollInstance, setHomeSectionsScrollInstance] = useState(0)
    const [sectionsIsActive, setSectionsIsActive] = useState(new Array(homeSections.length).fill(false).map((_, index) => index === 0))
    const handleSectionsIsActiveChange = (activeIndex) => {
        const newSectionIsActive = sectionsIsActive
        newSectionIsActive[activeIndex]=true
        setSectionsIsActive(newSectionIsActive)
    }
    const handleHomeNavTargetIndexChange = (targetIndex) => {
        setHomeNavTargetIndex(targetIndex)
        handleSectionsIsActiveChange(targetIndex)
    }
    const handleHomeSectionsScrollInstanceChange = (scrollInstanceIndex) => {
        setHomeSectionsScrollInstance(scrollInstanceIndex)
    }
    const sectionsName=homeSections.map((section)=>section.name)
    const sectionsFuc = homeSections.map((section) => section.component)
    return <div className="app-home">
        <header className='app-home__header'>
            <div className="app-home__header__navs">
                <SectionNavbar sectionsName={sectionsName} scrollInstance={homeSectionsScrollInstance } targetIndex={homeNavTargetIndex} onNavClick={ handleHomeNavTargetIndexChange} />
            </div>
            <div className="app-home__header__tools">
                <div className='app-left-show' onClick={handleLeftIsShowClick}>≡</div>
                <Searchbar/>
            </div>
        </header>
        <main className='app-home__main'>
            <SectionCardContainer sectionsIsActive={sectionsIsActive} sectionsFunc={sectionsFuc} onSectionScroll={ handleHomeSectionsScrollInstanceChange} onSectionSure={handleHomeNavTargetIndexChange} targetIndex={homeNavTargetIndex} />
        </main>
    </div>
}
export default Home