import React from 'react';

// 导航栏组件
const Navbar = ({ dynamicLinks = [], onLinkClick }) => {
  // 固定导航项
  const fixedLinks = [
    { label: '用户', href: '/user' },
    { label: '消息', href: '/messages' },
    { label: '历史', href: '/history' },
    { label: '创作中心', href: '/creator' },
  ];

  // 渲染动态的导航项
  const renderDynamicLinks = () => {
    return dynamicLinks.map((link, index) => (
      <li key={index}>
        <button onClick={() => onLinkClick(link)}>{link.label}</button>
      </li>
    ));
  };

  return (
    <nav className="navbar">
      <ul className="navbar-links">
        {/* 渲染固定导航项 */}
        {fixedLinks.map((link, index) => (
          <li key={index}>
            <a href={link.href}>{link.label}</a>
          </li>
        ))}
        
        {/* 渲染传入的动态导航项 */}
        {renderDynamicLinks()}
      </ul>
    </nav>
  );
};

export default Navbar;
