import React,{ createContext, useEffect, useState ,useContext} from 'react';
import './App.scss';
import { useTheme } from './contexts/ThemeContexts';
import {  NavLink, Outlet } from 'react-router-dom';
export const appLeftShow=createContext()
const App = () => {
  const {theme,setTheme} = useTheme()
  const [leftIsShow, setLeftIsShow] = useState(false)
  const handleLeftIsShowClick = () => {
    //  event.preventDefault()
    setLeftIsShow(leftIsShow===true?false:true)
  }
//   useEffect(() => {
//     return () => {
//       console.log("world")
//     }
//   }, [])
//   useEffect(() => { document.body.className = `${theme}-theme` }, [theme])
  // const toggleTheme = (newTheme) => {
  //   setTheme(newTheme)
  // }
  return (
    <appLeftShow.Provider value={{handleLeftIsShowClick }}>
    <div className={['app', leftIsShow ? 'left-open' : ''].join(' ')}>
        <div className='app__left-mask' onClick={handleLeftIsShowClick}></div>
          <aside className="app__left__container">
            <div className='app__left-close' onClick={handleLeftIsShowClick}>x</div>
            <img className='app__left__img' src='images/header/banner/小小陈.png' alt='请设置头像'></img>
            <nav className='app__left__navs'>
              <NavLink className={({ isActive }) => ['app__left__navs__nav', isActive ? 'app__left__navs__nav--active' : ''].join(' ')} to="/">首页</NavLink>
              <NavLink className={({ isActive }) => ['app__left__navs__nav', isActive ? 'app__left__navs__nav--active' : ''].join(' ')} to="circles">圈子</NavLink>
              <NavLink className={({ isActive }) => ['app__left__navs__nav', isActive ? 'app__left__navs__nav--active' : ''].join(' ')} to="shorts">短视频</NavLink>
              <NavLink className={({ isActive }) => ['app__left__navs__nav', isActive ? 'app__left__navs__nav--active' : ''].join(' ')} to="mine">我的</NavLink>
          </nav>
          <ul className='app__left__tools'>
            <li className='app__left__tool' onClick={()=>setTheme(theme==='light'?'dark':'light')}>{ `切换${theme==='light'?'深色':'浅色'}模式`}</li>
          </ul>
          </aside>
      <main className='app__right'>
        <Outlet/>
      </main>
        <nav className='app__bottom__navs'>
            <NavLink className={({isActive})=>['app__left__navs__nav',isActive?'app__left__navs__nav--active':''].join(' ')} to="/">首页</NavLink>
            <NavLink className={({isActive})=>['app__left__navs__nav',isActive?'app__left__navs__nav--active':''].join(' ')} to="circles">圈子</NavLink>
          <NavLink className={({isActive})=>['app__left__navs__nav',isActive?'app__left__navs__nav--active':''].join(' ')} to="shorts">短视频</NavLink>
        <NavLink className={({isActive})=>['app__left__navs__nav',isActive?'app__left__navs__nav--active':''].join(' ')} to="mine">我的</NavLink>
        </nav>
      </div>
      </appLeftShow.Provider>
  );
}

export default App
export const useAppLeftShow=()=> useContext(appLeftShow)