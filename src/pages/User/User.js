// import { useEffect} from 'react'
import { useEffect, useRef, useState} from 'react'
import './User.scss'
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import RouteNavbar from '../../components/Navbar/RouteNav/RouteNavbar';
import ChevronLeftIcon from '../../components/icons/ChevronLeftIcon';
const User = () => {
  const nav=useNavigate()
    const divTop = useRef(null)
    const { userId}=useParams()
  const [topOpacity, setTopOpacity] = useState(0);
      const routes = [{
        name: '主页',
        path:'user-home'
    },
        {
            name: '动态',
            path:'user-dynamics'
        }
  ]
  useEffect(() => {
    console.log(`user:${userId}`)
  },[userId])
useEffect(() => {
  const topScrollToShow = () => {
    const topScroll = divTop.current.scrollTop;
    const newOpacity = Math.min(topScroll / 200, 1); // 确保 opacity 不超过 1
    setTopOpacity(newOpacity);
  };

  if (divTop.current) {
    divTop.current.addEventListener('scroll', topScrollToShow);
  }

  return () => {
    if (divTop.current) {
      divTop.current.removeEventListener('scroll', topScrollToShow);
    }
  };
}, []);
    return <div className="app-user">
      <header className='app-user__top' style={{ opacity: `${topOpacity}` }}>
        
            <div className="info">
                <img src="/images/header/banner/小小陈.png" alt="用户头像" className="avatar"/>
                <span className="name">{userId}</span>
            </div>
      </header>
      <button className='backto' onClick={()=>nav(-1)}><ChevronLeftIcon className='back-icon'/></button>
      <main className='app-user__main' ref={divTop}>
        <div className="header">
          <div className="back">
          <img src='http://192.168.178.8:3100/uploads/avatar/circle/you.png' alt="空间背景图" className="backimg"/>
            <img src='http://192.168.178.8:3100/uploads/avatar/circle/you.png' alt="空间背景图" className="backimg-mask" />
          </div>
          <div className="info">
            <img src="/images/header/banner/小小陈.png" alt="头像" className="avatar" />
            <div className="person">
              <span className="name">{userId}
              </span>
              <p className="bio">ColorThief因其简便性和高效性被广泛应用于前端开发和图像处理相关的项目中。尽管直接指定与之集成的“典型生态项目”较为困难，因为它的适用范围非常广，ColorThief常与其他前端框架或者图像服务结合使用，如在构建响应式网页设计、React或Vue.js应用程序中的个性化功能模块。开发者通常会在自己的项目中嵌入ColorThief以实现特定的色彩分析需求，从而增强用户体验或进行数据分析的辅助。</p>
            </div>
            <ul className='three'>
              <li className='item'><div className="count">120</div><div className="name">关注</div></li>
              <li className='item'><div className="count">30</div><div className="name">粉丝</div></li>
              <li className='item'><div className="count">12131</div><div className="name">获赞</div></li>
            </ul>
          </div>
         </div>
          <div className="user-nav">
            <RouteNavbar routes={routes}/>
          </div>
          <Outlet/>
        </main>
    </div>
}
export default User