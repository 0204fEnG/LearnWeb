import { Outlet } from 'react-router-dom'
import RouteNavbar from '../../components/Navbar/RouteNav/RouteNavbar'
import './Creator.scss'
const Creator = () => {
    const routes = [{
        name: '创建圈子',
        path:'/creator/create-circle'
    }
  ]
    return (
        <div className="creator-container" >
            <RouteNavbar routes={routes} />
            <Outlet/>
        </div>
    )
}
export default Creator