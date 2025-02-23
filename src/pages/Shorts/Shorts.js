import {useContext} from 'react'
import Searchbar from '../../components/Searchbar/Searchbar.js'
import { AppContext } from '../../contexts/AppContext.js'
import { Outlet } from 'react-router-dom'
import ListOpen from '../../components/icons/ListOpen.js'
import RouteNavbar from '../../components/Navbar/RouteNav/RouteNavbar.js'
import './Shorts.scss'
const Shorts = () => {
    const { handleLeftIsShowClick, setBottomIsShow ,tabIsTransparent} = useContext(AppContext)
    const routes = [{
        name: '推荐',
        path:'shorts-recommend'
    }
    ]
    return <div className='app-shorts'>
        <header className={['app-shorts__header',tabIsTransparent?'transparent':''].join(' ')}>
            <div className="app-shorts__header__navs">
                <RouteNavbar routes={routes}/>
            </div>
            <div className="app-shorts__header__tools">
                <div className='app-left-show' onClick={handleLeftIsShowClick}><ListOpen className='list-open'/></div>
                <Searchbar setBottomIsShow={setBottomIsShow}/>
            </div>
        </header>
        <main className='app-shorts__main'>
            <Outlet/>
        </main>
    </div>
}
export default Shorts