import React,{ useEffect, useState } from 'react';
import './App.scss';
import Topbar from './components/Topbar/Topbar.js';
import { Link, Outlet } from 'react-router-dom';
const App=()=> {
  const [theme, setTheme] = useState('light')
document.body.className = `${theme}-theme`
  useEffect(() => {
    return () => {
      console.log("world")
    }
  }, [])
  useEffect(() => { document.body.className = `${theme}-theme` }, [theme])
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
  const toggleTheme = (newTheme) => {
    setTheme(newTheme)
  }
  return (
    <div className='app'>
      <header className='app__header'>
        <Topbar/>
        {/* <Banner bannerType={2} bannerData={bannerDate}/>
        <div className='change-theme' onClick={() => {
          const newTheme = theme === 'light'?'dark':'light'
          toggleTheme(newTheme)
        }}></div>
        <NavLink to="/2">点我！</NavLink> */}
      </header>
      <aside className='app__left'>
        <div className='app__aside'>
          <Link to="home">首页</Link>
        </div>
      </aside>
      <main className='app__right'>
        <Outlet/>
        </main>
    </div>
  );
}

export default App;
