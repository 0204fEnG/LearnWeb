import { useEffect, useState } from 'react';
import './App.css';
import Topbar from './components/Topbar/Topbar.js';
import Banner from './components/Banner/Banner.js';
import debounce from './utils/functions/debounce.js';
function App() {
  const [theme, setTheme] = useState('light')
  const [scrollY, setScrollY] = useState(0)
  useEffect(() => {
    const initScrollY = window.scrollY
    setScrollY(initScrollY)
    const handleScrollY = () => {
      const lastScrollY = window.scrollY
      setScrollY(lastScrollY)
    }
    const debounceHandleScrollY=debounce(handleScrollY,200)
    window.addEventListener('scroll',debounceHandleScrollY)
  },[])
  const bannerDate = {
    videoUrl:'/videos/x5.mp4'
  }
  const toggleTheme = (newTheme) => {
    setTheme(newTheme)
  }
  document.body.className=`${theme}-theme`
  return (
    <div className='app'>
      <header className='app__header'>
        <Topbar topbarScrollY={scrollY}/>
        <Banner bannerType={0} bannerData={bannerDate} bannerScrollY={scrollY}/>
        <div className='change-theme' onClick={() => {
          const newTheme = theme === 'light'?'dark':'light'
          toggleTheme(newTheme)
        }}></div>
      </header>
      <main className='app__main'>
      </main>
      <footer className='app__footer'></footer>
    </div>
  );
}

export default App;
