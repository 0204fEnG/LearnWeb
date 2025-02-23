import React,{ useEffect, useContext,useState, useRef, useCallback} from 'react';
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
import { debounce } from 'lodash';
import { SketchPicker } from 'react-color';
// 在已有imports中添加：
import chroma from 'chroma-js';
// import useAnimationClassName from './hooks/useAnimationClassName.js';
// import useRouteChangeTracker from './hooks/useRouteChangeTracker.js';
const App = () => {
  const { themeType, setThemeType, customColor, updateCustomColor, recoveryColor } = useTheme();
  const [showColorPicker, setShowColorPicker] = useState(false);
  const handleColorChange = (color) => {
    updateCustomColor(color.rgb);
  };
  const [tips, setTips] = useState([])
  const tipTimer=useRef(null)
  const [confirmDialogIsOpen,setConfirmDialogIsOpen]=useState(false)
  const [confirmDialogMessage,setConfirmDialogMessage]=useState('')
  const [handleConfirmDialogCancel,setHandleConfirmDialogCancel]=useState(null)
  const [handleConfirmDialogConfirm,setHandleConfirmDialogConfirm]=useState(null)
  const {handleLeftIsShowClick, setBottomIsShow, leftIsShow, bottomIsShow,tabIsTransparent,handleTabIsTransparent} = useContext(AppContext)
  // const animationClass = useAnimationClassName()
  const { avatar,isLogin}=useSelector(state => state.user);
  const dispatch=useDispatch()
  const nav=useNavigate()
  const location = useLocation();
  const pickTimer = useRef(null)
  const [isPickerEnter, setIsPickerEnter] = useState(false)
  const handleShowColorPicker = () => {
    if (!showColorPicker) {
      setShowColorPicker(true)
      setTimeout(() => {
        setIsPickerEnter(true)
      },0)
    }
    else {
      if (isPickerEnter) {
        setIsPickerEnter(false)
        pickTimer.current = setTimeout(() => {
          setShowColorPicker(false)
        }, 300)
      }
      else {
        clearTimeout(pickTimer.current)
        setIsPickerEnter(true)
      }
    }
  }
  const [lastRoutes, setLastRoutes] = useState({
    '/home': '/home/recommend',
    '/circles': '/circles/circles-recommend',
    '/shorts': '/shorts/shorts-recommend',
    '/mine': '/mine/mine-home'
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
  const debouncedEffect = useCallback(debounce(() => {
    clearTimeout(tipTimer.current);
    tipTimer.current = setTimeout(() => {
        setTips([]);
    }, 2000);
}, 500), [tips]);

useEffect(() => {
    debouncedEffect();
    return () => {
        clearTimeout(tipTimer.current);
        debouncedEffect.cancel();
    };
}, [debouncedEffect]);
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
    if (location.pathname.startsWith('/shorts')) {
      handleTabIsTransparent(true)
    }
    else {
      handleTabIsTransparent(false)
    }
    if (['/home', '/circles','/circles/circles-recommend', '/shorts','/shorts/shorts-recommend', '/mine','/home/recommend','/home/concern','/mine/mine-home','/mine/mine-dynamics','/mine/mine-follow'].includes(location.pathname)) {
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
      <div className='app__left-mask' onClick={() => {
        handleLeftIsShowClick()
        if (isPickerEnter) {
          handleShowColorPicker()
        }
      }
      }></div>
          <aside className="app__left__container">
        <div className='app__left-close' onClick={() => {
          handleLeftIsShowClick()
          if (isPickerEnter) {
          handleShowColorPicker()
        }
        }
        }><ListClose className='list-close' /></div>
        <img className='app__left__img' src={avatar} alt='请设置头像'/>
            <nav className='app__left__navs'>
              <NavLink className={({ isActive }) =>isActive ? 'app__left__navs__nav app__left__navs__nav--active':'app__left__navs__nav'} to={lastRoutes['/home']}>首页</NavLink>
          <NavLink className={({ isActive }) => isActive ? 'app__left__navs__nav app__left__navs__nav--active' : 'app__left__navs__nav'} to={lastRoutes['/circles']}>圈子</NavLink>
              <NavLink className={({ isActive }) =>isActive ? 'app__left__navs__nav app__left__navs__nav--active':'app__left__navs__nav'} to={lastRoutes['/shorts']}>短视频</NavLink>
              <NavLink className={({ isActive }) =>isActive ? 'app__left__navs__nav app__left__navs__nav--active':'app__left__navs__nav'} to={lastRoutes['/mine']}>我的</NavLink>
          </nav>
          <ul className='app__left__tools'>
            <li className='app__left__tool' onClick={()=>nav('/message')}>消息</li>
          <li className='app__left__tool' onClick={() => {
            const newTheme = themeType === 'light' ? 'dark' : 'light'; setThemeType(newTheme);
          }}>
               切换{themeType === 'light' ? '深色' : '浅色'}模式</li>
           <li className='app__left__tool' onClick={handleShowColorPicker}>
            自定义主题色
          </li>
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
      <nav className={['app__bottom__navs', !bottomIsShow ? 'bottom-close' : '',tabIsTransparent?'transparent':''].join(' ')}>
             <NavLink className={({ isActive }) =>isActive ? 'app__left__navs__nav app__left__navs__nav--active':'app__left__navs__nav'}  to={lastRoutes['/home']}>首页</NavLink>
        <NavLink className={({ isActive }) => isActive ? 'app__left__navs__nav app__left__navs__nav--active' : 'app__left__navs__nav'} to={lastRoutes['/circles']}>圈子</NavLink>
        <NavLink className={({ isActive }) => isActive ? 'app__left__navs__nav app__left__navs__nav--active' : 'app__left__navs__nav'} to={lastRoutes['/shorts']}>短视频</NavLink>
              <NavLink className={({ isActive }) =>isActive ? 'app__left__navs__nav app__left__navs__nav--active':'app__left__navs__nav'} to={lastRoutes['/mine']}>我的</NavLink>
      </nav>
          {tips.map((tip, index) => <Tip key={ index} message={tip.message} status={tip.status} />)}
      {confirmDialogIsOpen && <ConfirmDialog message={confirmDialogMessage} onCancel={handleConfirmDialogCancel} onConfirm={handleConfirmDialogConfirm} />}
      {showColorPicker && (
        <div className={`color-picker-popup ${isPickerEnter&&'picker-enter'}`} onClick={(e)=>e.stopPropagation()}>
        <SketchPicker
          color={chroma(customColor||'#4691e7').rgb()}
          onChange={handleColorChange}
                />
                <div className="recovery" onClick={(e) => {
                  e.stopPropagation()
                  recoveryColor()
        }}>恢复默认主题色</div>
      </div>
    )}
      </div>
  );
}
export default App