import {useEffect, useState,useContext, lazy } from 'react'
import SectionCardContainer from '../../components/ContentCard/SectionCardContainer/SectionCardContainer'
import SectionNavbar from '../../components/Navbar/SectionNavbar/SectionNavbar'
import './Home.scss'
import Searchbar from '../../components/Searchbar/Searchbar.js'
import { AppContext } from '../../contexts/AppContext.js'
import { Outlet, useLocation } from 'react-router-dom'
const LazyHomeRecommend = lazy(() => import('./HomeRecommend/HomeRecommend'))
const LazyHomeConcern=lazy(()=>import('./HomeConcern/HomeConcern')) 
// import { useOutletContext } from 'react-router-dom'
const Home = () => {
    // const location = useLocation()
    const [outletShow,setOutletShow]=useState(false)
    const { handleLeftIsShowClick,setBottomIsShow}=useContext(AppContext)
    const [homeSections,sethomeSections] =useState( [
        {
            name: '推荐',
            component:<LazyHomeRecommend/>
        },
        {
            name: '关注',
            component:<LazyHomeConcern/>
        }
    ])
    const [sectionsName, setSectionsName] = useState([])
    const [sectionsFuc,setSectionsFuc] =useState([]) 
    useEffect(() => {
        setSectionsName(homeSections.map((section) => section.name))
        setSectionsFuc(homeSections.map((section) => section.component))
    },[homeSections])
    const [homeNavTargetIndex, setHomeNavTargetIndex] = useState({index:0,isScroll:false})
    const [homeSectionsScrollInstance, setHomeSectionsScrollInstance] = useState(0)
    const [sectionsIsActive, setSectionsIsActive] = useState(new Array(homeSections.length).fill(false).map((_, index) => index === 0))
    const handleSectionsIsActiveChange = (activeIndex) => {
        const newSectionIsActive = [...sectionsIsActive]
        newSectionIsActive[activeIndex]=true
        setSectionsIsActive(newSectionIsActive)
    }
    const handleHomeNavTargetIndexChange = (targetIndex) => {
        setHomeNavTargetIndex(targetIndex)
        handleSectionsIsActiveChange(targetIndex.index)
    }
    const handleHomeSectionsScrollInstanceChange = (scrollInstanceIndex) => {
        setHomeSectionsScrollInstance(scrollInstanceIndex)
    }
    // useEffect(() => {
    //         // 获取当前路径
    // const currentPath = location.pathname;
    // // 定义二级路由的匹配规则
    // const isNestedRoute = currentPath.startsWith('/home/post');
    //     if (isNestedRoute) {
    //     setOutletShow(true)
    //     }
    //     else {
    //         setOutletShow(false)
    //     }
    //   }, [location.pathname]);
    return <div className="app-home">
        <header className='app-home__header'>
            <div className="app-home__header__navs">
                <SectionNavbar sectionsName={sectionsName} scrollInstance={homeSectionsScrollInstance } targetIndex={homeNavTargetIndex} onNavClick={ handleHomeNavTargetIndexChange} />
            </div>
            <div className="app-home__header__tools">
                <div className='app-left-show' onClick={handleLeftIsShowClick}>≡</div>
                <Searchbar setBottomIsShow={setBottomIsShow}/>
            </div>
        </header>
        <main className='app-home__main'>
            <SectionCardContainer sectionsIsActive={sectionsIsActive} sectionsFunc={sectionsFuc} onSectionScroll={ handleHomeSectionsScrollInstanceChange} onSectionActive={handleHomeNavTargetIndexChange} targetIndex={homeNavTargetIndex} />
        </main>
        <Outlet/>
    </div>
}
export default Home