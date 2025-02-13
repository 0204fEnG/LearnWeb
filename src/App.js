import React,{ useEffect, useContext,useState} from 'react';
import './App.scss';
import { useTheme } from './contexts/ThemeContext.js';
import {  NavLink, useLocation, useOutlet, useNavigate } from 'react-router-dom';
import { CSSTransition,TransitionGroup} from 'react-transition-group'
import { AppContext } from './contexts/AppContext.js';
import { transitionRoutes } from './routes/index.js';
import { authLoginUser,test } from "./api/auth.js";
import { useDispatch ,useSelector} from 'react-redux';
import { autoLoginSuccess, logout } from './actions/userActions.js';
import Tip from './components/Tip/Tip.js';
import ConfirmDialog from './components/ConfirmDialog/ConfirmDialog.js';
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
  const {handleLeftIsShowClick, setBottomIsShow, leftIsShow, bottomIsShow } = useContext(AppContext)
  // const animationClass = useAnimationClassName()
  const { avatar,isLogin}=useSelector(state => state.user);
  const dispatch=useDispatch()
  const nav=useNavigate()
  const location = useLocation();

  useEffect(() => {
    clearTimeout(tipClear)
    setTipClear(setTimeout(() => {
      setTips([])
    },2000))
  }, [tips])
  const handleTest = async() => {
    try {
      const res = await test()
    }
    catch (error) {
      setTips((prev) => [...prev, { message: error.message || error, status: 'red' }])
      if (error.message||error === "身份信息过期,请重新登录") {
        dispatch(logout())
      }
    }
  }
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
        <img className='app__left__img' src={avatar} alt='请设置头像'/>
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
          <li className='app__left__sign' onClick={handleLeftSignClick}>{!isLogin?'登录/注册':'退出登录'}</li>
          <li className='app__left__sign' onClick={handleTest}>受保护的接口</li>
          </ul>
          </aside>
      <main className='app__right'>
          {/* <Outlet/> */}
           <TransitionGroup>
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
        </TransitionGroup>
      </main>
          <nav className={['app__bottom__navs',!bottomIsShow?'bottom-close':''].join(' ')}>
             <NavLink className={({ isActive }) =>isActive ? 'app__left__navs__nav app__left__navs__nav--active':'app__left__navs__nav'} to="/">首页</NavLink>
              <NavLink className={({ isActive }) =>isActive ? 'app__left__navs__nav app__left__navs__nav--active':'app__left__navs__nav'} to="circles">圈子</NavLink>
              <NavLink className={({ isActive }) =>isActive ? 'app__left__navs__nav app__left__navs__nav--active':'app__left__navs__nav'} to="shorts">短视频</NavLink>
              <NavLink className={({ isActive }) =>isActive ? 'app__left__navs__nav app__left__navs__nav--active':'app__left__navs__nav'} to="mine">我的</NavLink>
      </nav>
          {
        tips.map((tip, index) => <Tip key={ index} message={tip.message} status={tip.status} />)
      }
      { confirmDialogIsOpen&&<ConfirmDialog message={confirmDialogMessage} onCancel={handleConfirmDialogCancel} onConfirm={handleConfirmDialogConfirm} />}
      </div>
  );
}
export default App