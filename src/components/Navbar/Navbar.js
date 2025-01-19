import { Link } from 'react-router-dom';
import './Navbar.scss'
// 导航栏组件
const Navbar = ({ navLinks }) => {
  const navs = navLinks.map((value) => <Link
    className="navbar__link"
    to={value.to}
  >{value.name}</Link>)
  return (
    <nav className="navbar">
      {navs}
    </nav>
  );
};

export default Navbar;
