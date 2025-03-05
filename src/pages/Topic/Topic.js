import { Outlet, useNavigate, useParams } from 'react-router-dom'
import './Topic.scss'
import { useDebugValue, useEffect, useRef, useState } from 'react'
import ChevronLeftIcon from '../../components/icons/ChevronLeftIcon'
import { Description } from '@mui/icons-material'
import RouteNavbar from '../../components/Navbar/RouteNav/RouteNavbar'
import TextOver from '../../components/TextOver/TextOver'
const Topic = () => {
    const {circleName }=useParams()
    const [count, setCount] = useState(0)
    const nav = useNavigate()
    const [circleInfo, setCircleInfo] = useState({})
    const routes = [{
        name: '看帖子',
        path:'posts'
    }
  ]
    useEffect(() => {
        setCircleInfo({
            name: '天堂鸡汤吧',
            avatar: '/images/header/banner/2.png',
            description: '前路迢迢，有薄雾弥漫，亦有热茶两盏前路迢迢，有薄雾弥漫，亦有热茶两盏前路迢迢，有薄雾弥漫，亦有热茶两盏前路迢迢，有薄雾弥漫，亦有热茶两盏前路迢迢，有薄雾弥漫，亦有热茶两盏前路迢迢，有薄雾弥漫，亦有热茶两盏前路迢迢，有薄雾弥漫，亦有热茶两盏前路迢迢，有薄雾弥漫，亦有热茶两盏前路迢迢，有薄雾弥漫，亦有热茶两盏',
            subscriptions: 12123,
            posts: 1223,
            initiatorId:113244444442,
            initiatorName: 'keai',
            initiatorAvatar:'/images/header/banner/1.png'
        })
    }, [])
    useEffect(() => {
        nav('posts',{replace:true})
    },[])
    return (
        <div className="topic">
            <div className="topic-top">
                <div className="back-to-wrapper" onClick={()=>nav(-1)}><ChevronLeftIcon className='back-to'/></div>
                <div className="topic-top-info">
                    <img src={circleInfo.avatar} alt="" className="avatar" />
                    {circleInfo.name}
                </div>
            </div>
            <div className="topic-header">
                <div className="topic-banner"></div>
                <div className="topic-content">
                    <img src={circleInfo.avatar} alt="" className="topic-avatar" />
                    <div className="info">
                        <div className="name">{circleInfo.name}
                            <button className='topic-sub'>
                                关注
                            </button>
                        </div>
                        <div className="counts">
                            <span>共{circleInfo.subscriptions}人关注</span>
                            <span>共{circleInfo.posts}条帖子</span>    
                        </div>
                        <div className="author">
                            <img src={circleInfo.initiatorAvatar} alt="" className="author-avatar" />
                            {circleInfo.initiatorName} 创建
                        </div>
                        <div className="description"><TextOver text={circleInfo.description}/></div>
                    </div>
                </div>
            </div>
            <div className="topic-navs">
                <RouteNavbar routes={routes}/>
            </div>
            <div className="topic-main">
                <Outlet/>
            </div>
        </div>
    )
}
export default Topic