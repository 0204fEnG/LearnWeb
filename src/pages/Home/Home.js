import {useContext, useEffect} from 'react'
import './Home.scss'
import Searchbar from '../../components/Searchbar/Searchbar.js'
import { AppContext } from '../../contexts/AppContext.js'
import { Outlet, useNavigate } from 'react-router-dom'
import ListOpen from '../../components/icons/ListOpen.js'
import RouteNavbar from '../../components/Navbar/RouteNav/RouteNavbar.js'
const Home = () => {
    const { handleLeftIsShowClick} = useContext(AppContext)

    const routes = [{
        name: '推荐',
        path:'recommend'
    },
        {
            name: '关注',
            path:'concern'
        }
    ]
    const nav = useNavigate()
    useEffect(() => {
        nav('recommend',{replace:true})
    },[])
    return <div className="app-home">
        <header className='app-home__header'>
            <div className="app-home__header__navs">
                <RouteNavbar routes={routes}/>
            </div>
            <div className="app-home__header__tools">
                <div className='app-left-show' onClick={handleLeftIsShowClick}><ListOpen className='list-open' /></div>
                <div className="search-tool"><Searchbar/></div>
            </div>
        </header>
        <main className='app-home__main'>
            <Outlet/>
        </main>
    </div>
}
export default Home