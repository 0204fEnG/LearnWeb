import React,{ createContext, useState ,useContext,createRef, useEffect} from 'react';
import './App.scss';
import { useTheme } from './contexts/ThemeContexts';
import { NavLink,   useLocation,useOutlet} from 'react-router-dom';
import { CSSTransition, SwitchTransition } from 'react-transition-group'
import ErrorPage from "./pages/ErrorPage/ErrorPage.js";
import Home from "./pages/Home/Home.js";
import Circles from "./pages/Circles/Circles.js";
import Shorts from "./pages/Shorts/Shorts.js";
import Mine from "./pages/Mine/Mine.js";
import Circle from "./pages/Circle/Circle.js";
export const appContext=createContext()
const App = () => {
  const { theme, setTheme } = useTheme()
  const [leftIsShow, setLeftIsShow] = useState(false)
  const [bottomIsShow, setBottomIsShow] = useState(true)
  const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        index:true,
        element: <Home />,
        nodeRef: createRef()
      },
      {
        path: "circles",
        element: <Circles />,
        nodeRef: createRef()
      },
        {
        path: "/circle/:circleName",
        element: <Circle />,
        nodeRef: createRef()
  },
      {
        path: "shorts",
        element: <Shorts />,
        nodeRef: createRef()
      },
      {
        path: "mine",
        element: <Mine />,
        nodeRef: createRef()
      }
    ],
    errorElement:<ErrorPage/>
  },
]
  const handleLeftIsShowClick = () => {
    setLeftIsShow(leftIsShow===true?false:true)
  }
  const location = useLocation();
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
    routes.find((route) => route.path === location.pathname) ?? {}
  return (
    <appContext.Provider value={{ handleLeftIsShowClick, setBottomIsShow }}>
    <div className={['app', leftIsShow ? 'left-open' : ''].join(' ')}>
        <div className='app__left-mask' onClick={handleLeftIsShowClick}></div>
          <aside className="app__left__container">
            <div className='app__left-close' onClick={handleLeftIsShowClick}>x</div>
            <img className='app__left__img' src='images/header/banner/小小陈.png' alt='请设置头像'></img>
            <nav className='app__left__navs'>
              <NavLink className={({ isActive }) =>isActive ? 'app__left__navs__nav app__left__navs__nav--active':'app__left__navs__nav'} to="/">首页</NavLink>
              <NavLink className={({ isActive }) =>isActive ? 'app__left__navs__nav app__left__navs__nav--active':'app__left__navs__nav'} to="circles">圈子</NavLink>
              <NavLink className={({ isActive }) =>isActive ? 'app__left__navs__nav app__left__navs__nav--active':'app__left__navs__nav'} to="shorts">短视频</NavLink>
              <NavLink className={({ isActive }) =>isActive ? 'app__left__navs__nav app__left__navs__nav--active':'app__left__navs__nav'} to="mine">我的</NavLink>
          </nav>
          <ul className='app__left__tools'>
            <li className='app__left__tool' onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>{`切换${theme === 'light' ? '深色' : '浅色'}模式`}</li>
          </ul>
          </aside>
      <main className='app__right'>
          {/* <Outlet/> */}
           <SwitchTransition mode='out-in'>
           <CSSTransition
            key={location.pathname}
            nodeRef={nodeRef}
              timeout={125}
            classNames='page'
            unmountOnExit
          >
            {(state) => (
              <div ref={nodeRef} className='page'>
                {currentOutlet}
              </div>
            )}
          </CSSTransition>
        </SwitchTransition>
        </main>
          <nav className={['app__bottom__navs',!bottomIsShow?'bottom-close':''].join(' ')}>
             <NavLink className={({ isActive }) =>isActive ? 'app__left__navs__nav app__left__navs__nav--active':'app__left__navs__nav'} to="/">首页</NavLink>
              <NavLink className={({ isActive }) =>isActive ? 'app__left__navs__nav app__left__navs__nav--active':'app__left__navs__nav'} to="circles">圈子</NavLink>
              <NavLink className={({ isActive }) =>isActive ? 'app__left__navs__nav app__left__navs__nav--active':'app__left__navs__nav'} to="shorts">短视频</NavLink>
              <NavLink className={({ isActive }) =>isActive ? 'app__left__navs__nav app__left__navs__nav--active':'app__left__navs__nav'} to="mine">我的</NavLink>
          </nav>
      </div>
      </appContext.Provider>
  );
}

export default App
export const useAppContext=()=> useContext(appContext)