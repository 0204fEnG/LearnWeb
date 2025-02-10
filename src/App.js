import React,{ useEffect, useContext,useState} from 'react';
import './App.scss';
import { useTheme } from './contexts/ThemeContext.js';
import {  NavLink, useLocation, useOutlet, useNavigate } from 'react-router-dom';
import { CSSTransition,TransitionGroup} from 'react-transition-group'
import { AppContext } from './contexts/AppContext.js';
import { transitionRoutes } from './routes/index.js';
import { authLoginUser } from "./api/auth.js";
import { useDispatch ,useSelector} from 'react-redux';
import { authLoginSuccess, logout } from '../../actions/userActions';
import Tip from './components/Tip/Tip.js';
// import useAnimationClassName from './hooks/useAnimationClassName.js';
// import useRouteChangeTracker from './hooks/useRouteChangeTracker.js';
const App = () => {
  const { theme, setTheme } = useTheme()
  const [tips, setTips] = useState([])
  const [tipClear,setTipClear]=useState(null)
  const { handleLeftIsShowClick, setBottomIsShow, leftIsShow, bottomIsShow } = useContext(AppContext)
  // const animationClass = useAnimationClassName()
  const { token, username,avator }=useSelector(state => state.user);
  const dispatch=useDispatch()
  const nav=useNavigate()
  const location = useLocation();

  useEffect(() => {
    clearTimeout(tipClear)
    setTipClear(setTimeout(() => {
      setTips([])
    },2000))
  },[tips])
const checkAutoLogin = async () => {
  try {
    if (token === null) {
      return
    }
    const response = await authLoginUser()
    setTips((prev) => [...prev, { message: response.message, color: 'rgb(51, 232, 51)' }])
    dispatch(authLoginSuccess(response.user));
  } catch (error) {
    setTips((prev) => [...prev, { message: error.message, color: 'rgb(223, 37, 37)'}])
  }
};
  useEffect(() => {
    checkAutoLogin()
  },[])
  useEffect(() => {
    if (['/', '/circles', '/shorts', '/mine'].includes(location.pathname)) {
      setBottomIsShow(true)
    }
    else {
      setBottomIsShow(false)
    }
  }, [location.pathname]);
  const currentOutlet = useOutlet()
  const { nodeRef } =
    transitionRoutes.find((route) => route.path === location.pathname) ?? {}
  return (
    <div className={['app', leftIsShow ? 'left-open' : ''].join(' ')}>
        <div className='app__left-mask' onClick={handleLeftIsShowClick}></div>
          <aside className="app__left__container">
            <div className='app__left-close' onClick={handleLeftIsShowClick}>x</div>
            <img className='app__left__img' src='images/header/banner/小小陈.png' alt='请设置头像' onClick={()=>nav('/auth')}></img>
            <nav className='app__left__navs'>
              <NavLink className={({ isActive }) =>isActive ? 'app__left__navs__nav app__left__navs__nav--active':'app__left__navs__nav'} to="/">首页</NavLink>
              <NavLink className={({ isActive }) =>isActive ? 'app__left__navs__nav app__left__navs__nav--active':'app__left__navs__nav'} to="circles">圈子</NavLink>
              <NavLink className={({ isActive }) =>isActive ? 'app__left__navs__nav app__left__navs__nav--active':'app__left__navs__nav'} to="shorts">短视频</NavLink>
              <NavLink className={({ isActive }) =>isActive ? 'app__left__navs__nav app__left__navs__nav--active':'app__left__navs__nav'} to="mine">我的</NavLink>
          </nav>
          <ul className='app__left__tools'>
            <li className='app__left__tool' onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>{`切换${theme === 'light' ? '深色' : '浅色'}模式`}</li>
          </ul>
          <ul className='app__left__signs'>
            <li className='app__left__sign' onClick={()=>nav('/auth')}>登录/注册</li>
          </ul>
          </aside>
      <main className='app__right'>
          {/* <Outlet/> */}
           <TransitionGroup>
           <CSSTransition
            key={location.pathname}
            nodeRef={nodeRef}
              timeout={400}
            classNames='page-left'
            unmountOnExit
          >
            {(state) => (
              <div ref={nodeRef} className='page'>
                {currentOutlet}
              </div>
              )}
          </CSSTransition>
        </TransitionGroup>
      </main>
          <nav className={['app__bottom__navs',!bottomIsShow?'bottom-close':''].join(' ')}>
             <NavLink className={({ isActive }) =>isActive ? 'app__left__navs__nav app__left__navs__nav--active':'app__left__navs__nav'} to="/">首页</NavLink>
              <NavLink className={({ isActive }) =>isActive ? 'app__left__navs__nav app__left__navs__nav--active':'app__left__navs__nav'} to="circles">圈子</NavLink>
              <NavLink className={({ isActive }) =>isActive ? 'app__left__navs__nav app__left__navs__nav--active':'app__left__navs__nav'} to="shorts">短视频</NavLink>
              <NavLink className={({ isActive }) =>isActive ? 'app__left__navs__nav app__left__navs__nav--active':'app__left__navs__nav'} to="mine">我的</NavLink>
      </nav>
          {
        tips.map((tip) => <Tip message={tip.message} color={tip.color} />)
           }
      </div>
  );
}
export default App