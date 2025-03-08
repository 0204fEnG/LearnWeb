import { useState ,useRef,useEffect} from 'react'
import './RouteNavbar.scss'
import { NavLink} from 'react-router-dom'
const RouteNavbar = ({ routes }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [currentWidth, setCurrentWidth] = useState(0)
  const [currentLeft, setCurrentLeft] = useState(0)
  const firstRef=useRef()
  useEffect(() => {
    if (firstRef.current.querySelector('.section-navbar__nav--active')) {
      setTimeout(()=>{setCurrentWidth(firstRef.current.querySelector('.section-navbar__nav--active').offsetWidth)},0) 
    }
  },[])
  const navs = routes.map((route, index) => (
    <NavLink key={index}
      className={[currentIndex===index?'section-navbar__nav--active':'', 'section-navbar__nav'].join(' ')}
      to={route.path}
      onClick={(e) => {
        e.stopPropagation()
        setCurrentIndex(index)
        setCurrentWidth(e.target?.offsetWidth)
        setCurrentLeft(e.target?.offsetLeft)
        e.target.scrollIntoView({ behavior: "smooth", inline: "center" });
      }
      }>
      {route.name}
    </NavLink>)
  )
    return (
        <nav className="section-navbar" ref={firstRef}>
        {navs}
        <div className="scrollbar" style={{width:`${currentWidth}px`,transform:`translateX(${currentLeft}px)`}}></div>
        </nav>
    )
}
export default RouteNavbar