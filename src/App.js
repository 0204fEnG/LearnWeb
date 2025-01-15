import React,{ useEffect, useState,useMemo } from 'react';
import './App.scss';
import Topbar from './components/Topbar/Topbar.js';
import Banner from './components/Banner/Banner.js';
import debounce from './utils/functions/debounce.js';
import { NavLink } from 'react-router-dom';
const App=()=> {
  const [theme, setTheme] = useState('light')
  const [scrollY, setScrollY] = useState(window.scrollY)
document.body.className = `${theme}-theme`
  useEffect(() => {
     
    const handleScrollY = () => {
      const lastScrollY = window.scrollY
      setScrollY(lastScrollY)
    }
    const debounceHandleScrollY=debounce(handleScrollY,200)
    window.addEventListener('scroll', debounceHandleScrollY)
    return () => {
      console.log("world")
    }
  }, [])
  useEffect(() => { document.body.className = `${theme}-theme` }, [theme])
  const bannerDate = [
    '/images/header/banner/unlock_wallpaper_1.jpg',
    '/images/header/banner/unlock_wallpaper_2.jpg',
    '/images/header/banner/unlock_wallpaper_3.jpg',
    '/images/header/banner/unlock_wallpaper_4.jpg',
    '/images/header/banner/unlock_wallpaper_5.jpg',
    '/images/header/banner/unlock_wallpaper_6.jpg',
    '/images/header/banner/unlock_wallpaper_7.jpg',
    '/images/header/banner/unlock_wallpaper_8.jpg'
  ]
  const toggleTheme = (newTheme) => {
    setTheme(newTheme)
  }
  return (
    <div className='app'>
      <header className='app__header'>
        <Topbar topbarScrollY={scrollY}/>
        {/* <Banner bannerType={2} bannerData={bannerDate}/>
        <div className='change-theme' onClick={() => {
          const newTheme = theme === 'light'?'dark':'light'
          toggleTheme(newTheme)
        }}></div>
        <NavLink to="/2">点我！</NavLink> */}
      </header>
      <div className="app__left">
      <slide className='app__slide'>
        </slide>
      </div>
      <div className='app__right'>
      <main className='app__main'>
        </main>
        </div>
    </div>
  );
}

export default App;
