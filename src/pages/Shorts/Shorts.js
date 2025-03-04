import {useContext,useEffect} from 'react'
import Searchbar from '../../components/Searchbar/Searchbar.js'
import { AppContext } from '../../contexts/AppContext.js'
import { Outlet, useNavigate } from 'react-router-dom'
import RouteNavbar from '../../components/Navbar/RouteNav/RouteNavbar.js'
import './Shorts.scss'
const Shorts = () => {
    const {setBottomIsShow} = useContext(AppContext)
    const routes = [{
        name: '推荐',
        path:'shorts-recommend'
    }
    ]
    const nav=useNavigate()
    useEffect(() => {
        nav('shorts-recommend',{replace:true})
    },[])
    return <div className='app-shorts'>
        <header className='app-shorts__header'>
            <div className="app-shorts__header__navs">
                <RouteNavbar routes={routes}/>
            </div>
            <div className="app-shorts__header__tools">
                <Searchbar setBottomIsShow={setBottomIsShow}/>
            </div>
        </header>
        <main className='app-shorts__main'>
            <Outlet/>
        </main>
    </div>
}
export default Shorts