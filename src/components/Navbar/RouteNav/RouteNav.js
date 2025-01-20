import { Link } from 'react-router-dom';
import './RouteNav.scss'
import { useState } from 'react';
// 导航栏组件
const RouteNav = ({ navLinks }) => {
    const [navIndex, setNavIndex] = useState(0);
    con
  const navs = navLinks.map((value) => <Link
    className="route-nav__link"
    to={value.to}
  >{value.name}</Link>)
  return (
    <nav className="route-nav">
      {navs}
    </nav>
  );
};

export default RouteNav;
