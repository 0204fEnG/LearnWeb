import { useState } from 'react'
import './RouteNavbar.scss'
import { NavLink} from 'react-router-dom'
const RouteNavbar = ({ routes}) => {
  const [currentIndex,setCurrentIndex]=useState(0)
  const navs = routes.map((route, index) => (
    <NavLink key={index}
      className={({ isActive }) => isActive ? 'section-navbar__nav section-navbar__nav--active' : 'section-navbar__nav'}
      to={route.path}
      onClick={() => 
        setCurrentIndex(index)
      }>
      {route.name}
    </NavLink>)
  )
    return (
        <nav className="section-navbar">
        {navs}
        <div className="scrollbar" style={{transform:`translateX(${currentIndex}00%)`}}></div>
        </nav>
    )
}
export default RouteNavbar