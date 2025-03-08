import {useContext,useEffect} from 'react'
import Searchbar from '../../components/Searchbar/Searchbar.js'
import { AppContext } from '../../contexts/AppContext.js'
import { Outlet ,useNavigate} from 'react-router-dom'
import ListOpen from '../../components/icons/ListOpen.js'
import RouteNavbar from '../../components/Navbar/RouteNav/RouteNavbar.js'
import './Circles.scss'
const Circles = () => {
    const { handleLeftIsShowClick} = useContext(AppContext)
    const routes = [{
        name: '推荐',
        path:'circles-recommend'
    }
    ]
    const nav = useNavigate()
    useEffect(() => {
        nav('circles-recommend',{replace:true})
    },[])
    return <div className="app-circles">
        <header className='app-circles__header'>
            <div className="app-circles__header__navs">
                <RouteNavbar routes={routes}/>
            </div>
            <div className="app-circles__header__tools">
                <div className='app-left-show' onClick={handleLeftIsShowClick}><ListOpen className='list-open' /></div>
                <div className="search-tool"><Searchbar/></div>
            </div>
        </header>
        <main className='app-circles__main'>
            <Outlet/>
        </main>
    </div>
}
export default Circles