import React,{ useEffect, useState } from 'react';
import './App.scss';
import { Link, NavLink, Outlet } from 'react-router-dom';
const App=()=> {
  const [theme, setTheme] = useState('light')
  const [isOpen, setIsOpen] = useState('true')
  const handleIsOpenClick = () => {
    setIsOpen(isOpen===true?false:true)
  }
  document.body.className = `${theme}-theme`
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
    <div className='app'>
      <aside className={['app__left',isOpen?'left-open':''].join(' ')}>
        <div className="app__left__container">
          <div className='isopen' onClick={handleIsOpenClick}></div>
          <img className='app__left__img' src='images/header/banner/小小陈.png' alt='请设置头像'></img>
          <nav className='app__left__navs'>
            <NavLink className={({isActive})=>['app__left__navs__nav',isActive?'app__left__navs__nav--active':''].join(' ')} to="/">首页</NavLink>
            <NavLink className={({isActive})=>['app__left__navs__nav',isActive?'app__left__navs__nav--active':''].join(' ')} to="circles">圈子</NavLink>
          <NavLink className={({isActive})=>['app__left__navs__nav',isActive?'app__left__navs__nav--active':''].join(' ')} to="shorts">短视频</NavLink>
        <NavLink className={({isActive})=>['app__left__navs__nav',isActive?'app__left__navs__nav--active':''].join(' ')} to="mine">我的</NavLink>
          </nav>
          </div>
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
  );
}

export default App;
