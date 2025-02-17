import React,{ useEffect, useContext,useState} from 'react';
import './App.scss';
import { useTheme } from './contexts/ThemeContext.js';
import {  NavLink, useLocation,  useNavigate,Outlet} from 'react-router-dom';
// import { CSSTransition,TransitionGroup} from 'react-transition-group'
import { AppContext } from './contexts/AppContext.js';
// import { transitionRoutes } from './routes/index.js';
import { authLoginUser } from "./api/auth.js";
import { useDispatch ,useSelector} from 'react-redux';
import { autoLoginSuccess, logout } from './actions/userActions.js';
import Tip from './components/Tip/Tip.js';
import ConfirmDialog from './components/ConfirmDialog/ConfirmDialog.js';
import ListClose from './components/icons/ListClose.js';
// import useAnimationClassName from './hooks/useAnimationClassName.js';
// import useRouteChangeTracker from './hooks/useRouteChangeTracker.js';
const App = () => {
  const {theme, setTheme } = useTheme()
  const [tips, setTips] = useState([])
  const [tipClear, setTipClear] = useState(null)
  const [confirmDialogIsOpen,setConfirmDialogIsOpen]=useState(false)
  const [confirmDialogMessage,setConfirmDialogMessage]=useState('')
  const [handleConfirmDialogCancel,setHandleConfirmDialogCancel]=useState(null)
  const [handleConfirmDialogConfirm,setHandleConfirmDialogConfirm]=useState(null)
  const {handleLeftIsShowClick, setBottomIsShow, leftIsShow, bottomIsShow} = useContext(AppContext)
  // const animationClass = useAnimationClassName()
  const { avatar,isLogin}=useSelector(state => state.user);
  const dispatch=useDispatch()
  const nav=useNavigate()
  const location = useLocation();
  const [lastRoutes, setLastRoutes] = useState({
    '/home': '/home/recommend',
    '/circles': '/circles',
    '/shorts': '/shorts',
    '/mine': '/mine/minehome'
  });

  useEffect(() => {
    // 获取当前路径的父级路径，这里假设路由结构是按照层级组织的
    const parentPath = location.pathname.split('/').slice(0, -1).join('/') || '/';
    // 更新 lastRoutes 状态，只修改当前点击的路由的记录
    // 使用函数式更新来避免不必要的重新渲染
    setLastRoutes(prevLastRoutes => {
      if (prevLastRoutes[parentPath] !== location.pathname) {
        return {
          ...prevLastRoutes,
          [parentPath]: location.pathname // 使用当前路径作为最后一次点击的路径
        };
      }
      return prevLastRoutes; // 如果没有变化，返回原对象
    });
  }, [location.pathname]);
  useEffect(() => {
    clearTimeout(tipClear)
    setTipClear(setTimeout(() => {
      setTips([])
    },2000))
  }, [tips])
  const handleLeftSignClick = () => {
    if (isLogin) {
      const confirm = () => {
        setConfirmDialogIsOpen(false)
        dispatch(logout())
        setTips((prev) => [...prev, { message: '退出成功,请重新登录!', status: 'green' }])
        setTimeout(()=>nav('/auth'),1000)
      }
      const cancel = () => {
        setConfirmDialogIsOpen(false)
      }
      setConfirmDialogIsOpen(true)
      setConfirmDialogMessage('您确定要退出登录吗?')
      setHandleConfirmDialogConfirm(()=>confirm)
      setHandleConfirmDialogCancel(()=>cancel)
    }
    else {
      nav('/auth')
    }
  }
  const checkAutoLogin = async () => {
    try {
    if (isLogin) {
      return
    }
    const response = await authLoginUser()
    setTips((prev) => [...prev, { message: response.message, status:'green' }])
    dispatch(autoLoginSuccess(response.user));
  } catch (error) {
    setTips((prev) => [...prev, { message: error.message || error, status:'red' }])
  }
};
  useEffect(() => {
    checkAutoLogin()
  }, [])
  useEffect(() => {
    nav('/home/recommend')
  },[])
  useEffect(() => {
    if (['/home', '/circles', '/shorts', '/mine','/home/recommend','/home/concern','/mine/minehome','/mine/dynamics'].includes(location.pathname)) {
      setBottomIsShow(true)
    }
    else {
      setBottomIsShow(false)
    }
  }, [location.pathname]);

  // const currentOutlet = useOutlet()
  // const { nodeRef } =
  //   transitionRoutes.find((route) => route.path === location.pathname) ?? {}
  return (
    <div className={['app', leftIsShow ? 'left-open' : ''].join(' ')}>
        <div className='app__left-mask' onClick={handleLeftIsShowClick}></div>
          <aside className="app__left__container">
            <div className='app__left-close' onClick={handleLeftIsShowClick}><ListClose className='list-close'/></div>
        <img className='app__left__img' src={avatar} alt='请设置头像'/>
            <nav className='app__left__navs'>
              <NavLink className={({ isActive }) =>isActive ? 'app__left__navs__nav app__left__navs__nav--active':'app__left__navs__nav'} to={lastRoutes['/home']}>首页</NavLink>
          <NavLink className={({ isActive }) => isActive ? 'app__left__navs__nav app__left__navs__nav--active' : 'app__left__navs__nav'} to={lastRoutes['/circles']}>圈子</NavLink>
              <NavLink className={({ isActive }) =>isActive ? 'app__left__navs__nav app__left__navs__nav--active':'app__left__navs__nav'} to={lastRoutes['/shorts']}>短视频</NavLink>
              <NavLink className={({ isActive }) =>isActive ? 'app__left__navs__nav app__left__navs__nav--active':'app__left__navs__nav'} to={lastRoutes['/mine']}>我的</NavLink>
          </nav>
          <ul className='app__left__tools'>
            <li className='app__left__tool' onClick={()=>nav('/message')}>消息</li>
            <li className='app__left__tool' onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>{`切换${theme === 'light' ? '深色' : '浅色'}模式`}</li>
            <li className='app__left__tool'>设置</li>
            <li className='app__left__tool'>帮助与反馈</li>
          </ul>
          <ul className='app__left__signs'>
          <li className='app__left__sign' onClick={handleLeftSignClick}>{!isLogin?'登录/注册':'退出登录'}</li>
          </ul>
          </aside>
      <main className='app__right'>
          <Outlet/>
           {/* <TransitionGroup>
           <CSSTransition
            key={location.pathname}
            nodeRef={nodeRef}
              timeout={300}
            classNames='page-left'
            unmountOnExit
          >
            {(state) => (
              <div ref={nodeRef} className='page'>
                {currentOutlet}
              </div>
              )}
          </CSSTransition>
        </TransitionGroup> */}
      </main>
          <nav className={['app__bottom__navs',!bottomIsShow?'bottom-close':''].join(' ')}>
             <NavLink className={({ isActive }) =>isActive ? 'app__left__navs__nav app__left__navs__nav--active':'app__left__navs__nav'}  to={lastRoutes['/home']}>首页</NavLink>
        <NavLink className={({ isActive }) => isActive ? 'app__left__navs__nav app__left__navs__nav--active' : 'app__left__navs__nav'} to={lastRoutes['/circles']}>圈子</NavLink>
      <NavLink className={({ isActive }) => isActive ? 'app__left__navs__nav app__left__navs__nav--active' : 'app__left__navs__nav'} to={lastRoutes['/shorts']}>短视频</NavLink>
              <NavLink className={({ isActive }) =>isActive ? 'app__left__navs__nav app__left__navs__nav--active':'app__left__navs__nav'} to={lastRoutes['/mine']}>我的</NavLink>
      </nav>
          {
        tips.map((tip, index) => <Tip key={ index} message={tip.message} status={tip.status} />)
      }
      { confirmDialogIsOpen&&<ConfirmDialog message={confirmDialogMessage} onCancel={handleConfirmDialogCancel} onConfirm={handleConfirmDialogConfirm} />}
      </div>
  );
}
export default App