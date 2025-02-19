// import { useEffect} from 'react'
import { useEffect, useRef, useState} from 'react'
import './Mine.scss'
import Message from '../../components/icons/Message';
import { NavLink, Outlet } from 'react-router-dom';
import RouteNavbar from '../../components/Navbar/RouteNav/RouteNavbar';
const Mine = () => {
    const divTop = useRef(null)
  const [topOpacity, setTopOpacity] = useState(0);
      const routes = [{
        name: '主页',
        path:'/mine/minehome'
    },
        {
            name: '动态',
            path:'/mine/minedynamics'
        }
  ]
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
    return <div className="app-mine">
        <header className='app-mine__top' style={{opacity:`${topOpacity}`}}>
            <div className="info">
                <img src="/images/header/banner/小小陈.png" alt="用户头像" className="avatar"/>
                <span className="name">feng</span>
            </div>
      </header>
          <ul className="tools">
        <li className='tool'>
          <Message className='tool-svg'/>
              <span className='name'>消息</span>
            </li>
          </ul> 
      <main className='app-mine__main' ref={divTop}>
        <div className="header">
          <div className="back">
          <img src='http://192.168.178.8:3100/uploads/avatar/circle/you.png' alt="空间背景图" className="backimg"/>
            <img src='http://192.168.178.8:3100/uploads/avatar/circle/you.png' alt="空间背景图" className="backimg-mask" />
          </div>
          <div className="info">
            <img src="/images/header/banner/小小陈.png" alt="头像" className="avatar" />
            <div className="person">
              <span className="name">feng
              </span>
              <p className="bio">ColorThief因其简便性和高效性被广泛应用于前端开发和图像处理相关的项目中。尽管直接指定与之集成的“典型生态项目”较为困难，因为它的适用范围非常广，ColorThief常与其他前端框架或者图像服务结合使用，如在构建响应式网页设计、React或Vue.js应用程序中的个性化功能模块。开发者通常会在自己的项目中嵌入ColorThief以实现特定的色彩分析需求，从而增强用户体验或进行数据分析的辅助。</p>
            </div>
            <ul className='three'>
              <NavLink to='/mine/minefollow' className={({ isActive }) =>isActive ?'item item--active':'item'}><div className="count">120</div><div className="name">关注</div></NavLink>
              <NavLink className={({ isActive }) =>isActive ?'item item-active':'item'}><div className="count">30</div><div className="name">粉丝</div></NavLink>
              <NavLink className='item'><div className="count">12131</div><div className="name">获赞</div></NavLink>
            </ul>
          </div>
         </div>
          <div className="mine-nav">
            <RouteNavbar routes={routes}/>
          </div>
          <Outlet/>
        </main>
    </div>
}
export default Mine