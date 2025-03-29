import { Outlet, useNavigate, useParams } from 'react-router-dom'
import './Circle.scss'
import { useEffect, useState } from 'react'
import ChevronLeftIcon from '../../components/icons/ChevronLeftIcon'
import RouteNavbar from '../../components/Navbar/RouteNav/RouteNavbar'
import TextOver from '../../components/TextOver/TextOver'
import { getCircleById } from '../../api/circle'
import Loading from '../../components/Loading/Loading'

const Circle = () => {
  const { circleId } = useParams()
  const nav = useNavigate()
  const [loading, setLoading] = useState(true)
  const [circleInfo, setCircleInfo] = useState({})
  const routes = [
    { name: '看帖子', path: 'posts' }
  ]

  useEffect(() => {
    const fetchCircleData = async () => {
      try {
        const { data } = await getCircleById(circleId)
        setCircleInfo(data)
      } catch (error) {
        console.error('获取圈子信息失败:', error)
        nav(-1, { replace: true })
      } finally {
        setLoading(false)
      }
    }
    
    fetchCircleData()
  }, [circleId, nav])

  useEffect(() => {
    nav('posts', { replace: true })
  }, [nav])

  if (loading) return <Loading fullScreen />

  return (
    <div className="circle">
      <div className="circle-top">
        <div className="back-to-wrapper" onClick={() => nav(-1)}>
          <ChevronLeftIcon className='back-to'/>
        </div>
        <div className="circle-top-info">
          <img src={circleInfo.avatar} alt="" className="avatar" />
          {circleInfo.name}
        </div>
      </div>

      <div className="circle-header">
        <div className="circle-banner" 
             style={{ backgroundImage: `url(${circleInfo.avatar})` }} />
        <div className="circle-content">
          <img src={circleInfo.avatar} alt="" className="circle-avatar" />
          <div className="info">
            <div className="name">
              {circleInfo.name}
              <button className='circle-sub'>关注</button>
            </div>
            <div className="counts">
              <span>共{circleInfo.subscriptions}人关注</span>
              <span>共{circleInfo.posts}条帖子</span>    
            </div>
            <div className="author">
              <img src={circleInfo.initiatorAvatar} alt="" className="author-avatar" />
              {circleInfo.initiatorName} 创建
            </div>
            <div className="description">
              <TextOver text={circleInfo.description}/>
            </div>
          </div>
        </div>
      </div>

      <div className="circle-navs">
        <RouteNavbar routes={routes} />
      </div>
      
      <div className="circle-main">
              <Outlet context={circleId } />
      </div>
    </div>
  )
}

export default Circle