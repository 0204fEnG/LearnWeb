import React,{ useEffect, useState } from 'react';
import './App.scss';
import { Link, Outlet } from 'react-router-dom';
const App=()=> {
//   const [theme, setTheme] = useState('light')
// document.body.className = `${theme}-theme`
//   useEffect(() => {
//     return () => {
//       console.log("world")
//     }
//   }, [])
//   useEffect(() => { document.body.className = `${theme}-theme` }, [theme])
  // const bannerDate = [
  //   '/images/header/banner/unlock_wallpaper_1.jpg',
  //   '/images/header/banner/unlock_wallpaper_2.jpg',
  //   '/images/header/banner/unlock_wallpaper_3.jpg',
  //   '/images/header/banner/unlock_wallpaper_4.jpg',
  //   '/images/header/banner/unlock_wallpaper_5.jpg',
  //   '/images/header/banner/unlock_wallpaper_6.jpg',
  //   '/images/header/banner/unlock_wallpaper_7.jpg',
  //   '/images/header/banner/unlock_wallpaper_8.jpg'
  // ]
  // const toggleTheme = (newTheme) => {
  //   setTheme(newTheme)
  // }
  return (
    <div className='app'>
      <aside className='app__left'>
        <div className="app__left__container">
        <div className='app__left__img'>
          头像
        </div>
        <nav className='app__left__navs'>
            <Link to="home">首页</Link>
          </nav>
          </div>
      </aside>
      <main className='app__right'>
        <Outlet/>
      </main>
    </div>
  );
}

export default App;
