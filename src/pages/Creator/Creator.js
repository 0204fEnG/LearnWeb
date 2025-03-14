import { Outlet, useNavigate } from 'react-router-dom'
import RouteNavbar from '../../components/Navbar/RouteNav/RouteNavbar'
import './Creator.scss'
import { useEffect } from 'react'
import Title from'../../components/Title/Title'
const Creator = () => {
    const nav=useNavigate()
    const routes = [{
        name: '创建圈子',
        path:'create-circle'
    }, {
        name: '发布帖子',
        path:'create-post'
    }
    ]
    useEffect(() => {
        nav('create-circle', { replace: true })
    },[])
    return (
        <div className="creator-container" >
            <Title title='发布中心' stickyClass={{position:'sticky',top:'0px'}}/>
            <div className="creator-navs"><RouteNavbar routes={routes} /></div>
            
            <Outlet/>
        </div>
    )
}
export default Creator